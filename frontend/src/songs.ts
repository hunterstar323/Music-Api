import { songsApi, genresApi, type Song, type Genre } from './api';

let editingId: number | null = null;
let genresList: Genre[] = [];

export function renderSongs(container: HTMLElement): void {
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-6 text-cyan-400">Canciones</h2>

    <form id="song-form" class="mb-8 bg-gray-800/60 border border-white/10 p-5 rounded-2xl backdrop-blur space-y-4">
      <h3 id="song-form-title" class="font-semibold text-lg text-gray-200">Crear Canción</h3>
      <div class="flex flex-wrap gap-3">
        <input id="song-title" type="text" placeholder="Título" required
          class="flex-1 min-w-[150px] bg-gray-700/50 border border-white/10 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 transition" />
        <input id="song-artist" type="text" placeholder="Artista" required
          class="flex-1 min-w-[150px] bg-gray-700/50 border border-white/10 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 transition" />
        <input id="song-album" type="text" placeholder="Álbum"
          class="flex-1 min-w-[150px] bg-gray-700/50 border border-white/10 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 transition" />
        <input id="song-year" type="number" placeholder="Año" min="1900" required
          class="w-24 bg-gray-700/50 border border-white/10 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 transition" />
        <select id="song-genre" required
          class="w-44 bg-gray-700/50 border border-white/10 text-gray-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 transition">
          <option value="">Seleccionar género</option>
        </select>
        <button type="submit"
          class="px-6 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300
          bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-md shadow-cyan-600/20
          hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 cursor-pointer">
          Guardar
        </button>
        <button type="button" id="song-cancel"
          class="hidden px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300
          bg-gray-600 text-gray-200 hover:bg-gray-500 active:scale-95 cursor-pointer">
          Cancelar
        </button>
      </div>
    </form>

    <!-- Filtro por género -->
    <div class="mb-6 flex items-center gap-3">
      <label class="text-sm font-medium text-gray-400">Filtrar por género:</label>
      <select id="song-filter"
        class="bg-gray-800/60 border border-white/10 text-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/60 transition">
        <option value="">Todos</option>
      </select>
    </div>

    <div id="songs-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
  `;

  const form = document.getElementById('song-form') as HTMLFormElement;
  const titleInput = document.getElementById('song-title') as HTMLInputElement;
  const artistInput = document.getElementById('song-artist') as HTMLInputElement;
  const albumInput = document.getElementById('song-album') as HTMLInputElement;
  const yearInput = document.getElementById('song-year') as HTMLInputElement;
  const genreSelect = document.getElementById('song-genre') as HTMLSelectElement;
  const cancelBtn = document.getElementById('song-cancel')!;
  const filterSelect = document.getElementById('song-filter') as HTMLSelectElement;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      title: titleInput.value.trim(),
      artist: artistInput.value.trim(),
      album: albumInput.value.trim(),
      year: Number(yearInput.value),
      genreId: Number(genreSelect.value),
    };
    if (!data.title || !data.artist || !data.genreId) return;

    try {
      if (editingId !== null) {
        await songsApi.update(editingId, data);
        editingId = null;
      } else {
        await songsApi.create(data);
      }
      resetForm();
      await loadSongs(filterSelect.value ? Number(filterSelect.value) : undefined);
    } catch (err) {
      alert((err as Error).message);
    }
  });

  cancelBtn.addEventListener('click', () => {
    editingId = null;
    resetForm();
  });

  filterSelect.addEventListener('change', () => {
    const val = filterSelect.value;
    loadSongs(val ? Number(val) : undefined);
  });

  initPage();
}

function resetForm(): void {
  (document.getElementById('song-title') as HTMLInputElement).value = '';
  (document.getElementById('song-artist') as HTMLInputElement).value = '';
  (document.getElementById('song-album') as HTMLInputElement).value = '';
  (document.getElementById('song-year') as HTMLInputElement).value = '';
  (document.getElementById('song-genre') as HTMLSelectElement).value = '';
  document.getElementById('song-form-title')!.textContent = 'Crear Canción';
  document.getElementById('song-cancel')!.classList.add('hidden');
}

async function initPage(): Promise<void> {
  try {
    genresList = await genresApi.getAll();
    populateGenreOptions('song-genre', genresList);
    populateGenreOptions('song-filter', genresList);
  } catch {
    /* genres failed, selects stay empty */
  }
  await loadSongs();
}

function populateGenreOptions(selectId: string, genres: Genre[]): void {
  const select = document.getElementById(selectId) as HTMLSelectElement;
  const firstOption = select.options[0];
  select.innerHTML = '';
  select.appendChild(firstOption);
  genres.forEach((g) => {
    const opt = document.createElement('option');
    opt.value = String(g.id);
    opt.textContent = g.name;
    select.appendChild(opt);
  });
}

async function loadSongs(genreId?: number): Promise<void> {
  const list = document.getElementById('songs-list')!;
  try {
    const songs = await songsApi.getAll(genreId);
    if (songs.length === 0) {
      list.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">No hay canciones registradas.</p>';
      return;
    }
    list.innerHTML = songs.map((s) => songCard(s)).join('');
    list.querySelectorAll('[data-edit-song]').forEach((btn) =>
      btn.addEventListener('click', () => startEdit(Number((btn as HTMLElement).dataset.editSong)))
    );
    list.querySelectorAll('[data-delete-song]').forEach((btn) =>
      btn.addEventListener('click', () => {
        const filterSelect = document.getElementById('song-filter') as HTMLSelectElement;
        deleteSong(Number((btn as HTMLElement).dataset.deleteSong), filterSelect.value ? Number(filterSelect.value) : undefined);
      })
    );
  } catch {
    list.innerHTML = '<p class="text-red-400 col-span-full text-center py-8">Error al cargar canciones. ¿El servidor está corriendo (Voy a buscarlo LOL)?</p>';
  }
}

function getGenreName(genreId: number): string {
  return genresList.find((g) => g.id === genreId)?.name ?? 'Sin género';
}

function songCard(s: Song): string {
  return `
    <div class="group bg-gray-800/50 border border-white/5 rounded-2xl p-5 hover:border-cyan-500/30 hover:bg-gray-800/80 transition-all duration-300 text-center">
      <div class="mb-3">
        <span class="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 mb-2">
          ${getGenreName(s.genreId)}
        </span>
        <h4 class="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition">${s.title}</h4>
        <p class="text-sm text-gray-300 mt-0.5">${s.artist}</p>
      </div>
      <p class="text-xs text-gray-500 mb-3">${s.album ? s.album + ' · ' : ''}${s.year}</p>
      <br>
      <div class="flex gap-2 pt-2 border-t border-white/5">
        <button data-edit-song="${s.id}"
          class="flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-300
          bg-amber-500/10 text-amber-400 border border-amber-500/20
          hover:bg-amber-500/20 hover:border-amber-400/40 hover:shadow-md hover:shadow-amber-500/10
          active:scale-95 cursor-pointer">
          Editar
        </button>
        <button data-delete-song="${s.id}"
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
    const song = await songsApi.getById(id);
    editingId = id;
    (document.getElementById('song-title') as HTMLInputElement).value = song.title;
    (document.getElementById('song-artist') as HTMLInputElement).value = song.artist;
    (document.getElementById('song-album') as HTMLInputElement).value = song.album;
    (document.getElementById('song-year') as HTMLInputElement).value = String(song.year);
    (document.getElementById('song-genre') as HTMLSelectElement).value = String(song.genreId);
    document.getElementById('song-form-title')!.textContent = 'Editar Canción';
    document.getElementById('song-cancel')!.classList.remove('hidden');
  } catch (err) {
    alert((err as Error).message);
  }
}

async function deleteSong(id: number, genreId?: number): Promise<void> {
  if (!confirm('¿Seguro que deseas eliminar esta canción?')) return;
  try {
    await songsApi.delete(id);
    await loadSongs(genreId);
  } catch (err) {
    alert((err as Error).message);
  }
}
