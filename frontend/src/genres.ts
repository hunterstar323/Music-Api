import { genresApi, type Genre } from './api';

let editingId: number | null = null;

export function renderGenres(container: HTMLElement): void {
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-6 text-purple-400">Géneros Musicales</h2>

    <form id="genre-form" class="mb-8 bg-gray-800/60 border border-white/10 p-5 rounded-2xl backdrop-blur space-y-4">
      <h3 id="genre-form-title" class="font-semibold text-lg text-gray-200">Crear Género</h3>
      <div class="flex flex-col md:flex-row gap-3">
        <input id="genre-name" type="text" placeholder="Nombre" required
          class="flex-1 bg-gray-700/50 border border-white/10 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition" />
        <input id="genre-desc" type="text" placeholder="Descripción" required
          class="flex-1 bg-gray-700/50 border border-white/10 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition" />
        <button type="submit"
          class="px-6 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300
          bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-md shadow-purple-600/20
          hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105 active:scale-95 cursor-pointer">
          Guardar
        </button>
        <button type="button" id="genre-cancel"
          class="hidden px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300
          bg-gray-600 text-gray-200 hover:bg-gray-500 active:scale-95 cursor-pointer">
          Cancelar
        </button>
      </div>
    </form>

    <div id="genres-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
  `;

  const form = document.getElementById('genre-form') as HTMLFormElement;
  const nameInput = document.getElementById('genre-name') as HTMLInputElement;
  const descInput = document.getElementById('genre-desc') as HTMLInputElement;
  const formTitle = document.getElementById('genre-form-title')!;
  const cancelBtn = document.getElementById('genre-cancel')!;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { name: nameInput.value.trim(), description: descInput.value.trim() };
    if (!data.name || !data.description) return;

    try {
      if (editingId !== null) {
        await genresApi.update(editingId, data);
        editingId = null;
      } else {
        await genresApi.create(data);
      }
      nameInput.value = '';
      descInput.value = '';
      formTitle.textContent = 'Crear Género';
      cancelBtn.classList.add('hidden');
      await loadGenres();
    } catch (err) {
      alert((err as Error).message);
    }
  });

  cancelBtn.addEventListener('click', () => {
    editingId = null;
    nameInput.value = '';
    descInput.value = '';
    formTitle.textContent = 'Crear Género';
    cancelBtn.classList.add('hidden');
  });

  loadGenres();
}

async function loadGenres(): Promise<void> {
  const list = document.getElementById('genres-list')!;
  try {
    const genres = await genresApi.getAll();
    if (genres.length === 0) {
      list.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">No hay géneros registrados.</p>';
      return;
    }
    list.innerHTML = genres.map((g) => genreCard(g)).join('');
    list.querySelectorAll('[data-edit-genre]').forEach((btn) =>
      btn.addEventListener('click', () => startEdit(Number((btn as HTMLElement).dataset.editGenre)))
    );
    list.querySelectorAll('[data-delete-genre]').forEach((btn) =>
      btn.addEventListener('click', () => deleteGenre(Number((btn as HTMLElement).dataset.deleteGenre)))
    );
  } catch {
    list.innerHTML = '<p class="text-red-400 col-span-full text-center py-8">Error al cargar géneros. ¿El servidor está corriendo?</p>';
  }
}

function genreCard(g: Genre): string {
  return `
    <div class="group bg-gray-800/50 border border-white/5 rounded-2xl p-5 hover:border-purple-500/30 hover:bg-gray-800/80 transition-all duration-300">
      <div class="mb-3">
        <h4 class="text-lg font-bold text-purple-400 group-hover:text-purple-300 transition">${g.name}</h4>
        <p class="text-sm text-gray-400 mt-1 leading-relaxed">${g.description}</p>
      </div>
      <div class="flex gap-2 pt-2 border-t border-white/5">
        <button data-edit-genre="${g.id}"
          class="flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-300
          bg-amber-500/10 text-amber-400 border border-amber-500/20
          hover:bg-amber-500/20 hover:border-amber-400/40 hover:shadow-md hover:shadow-amber-500/10
          active:scale-95 cursor-pointer">
          Editar
        </button>
        <button data-delete-genre="${g.id}"
          class="flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-300
          bg-red-500/10 text-red-400 border border-red-500/20
          hover:bg-red-500/20 hover:border-red-400/40 hover:shadow-md hover:shadow-red-500/10
          active:scale-95 cursor-pointer">
          Eliminar
        </button>
      </div>
    </div>
  `;
}

async function startEdit(id: number): Promise<void> {
  try {
    const genre = await genresApi.getById(id);
    editingId = id;
    (document.getElementById('genre-name') as HTMLInputElement).value = genre.name;
    (document.getElementById('genre-desc') as HTMLInputElement).value = genre.description;
    document.getElementById('genre-form-title')!.textContent = 'Editar Género';
    document.getElementById('genre-cancel')!.classList.remove('hidden');
  } catch (err) {
    alert((err as Error).message);
  }
}

async function deleteGenre(id: number): Promise<void> {
  if (!confirm('¿Seguro que deseas eliminar este género?')) return;
  try {
    await genresApi.delete(id);
    await loadGenres();
  } catch (err) {
    alert((err as Error).message);
  }
}
