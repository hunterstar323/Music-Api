import './style.css';
import { renderGenres } from './genres.js';
import { renderSongs } from './songs.js';

const app = document.getElementById('app')!;

type View = 'genres' | 'songs';

function render(view: View): void {
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <nav class="border-b border-white/10 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent select-none">
            Music API
          </h1>
          <div class="flex gap-3">
            <button id="nav-genres"
              class="relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300
              ${view === 'genres'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/10'}">
              Géneros
            </button>
            <button id="nav-songs"
              class="relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300
              ${view === 'songs'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/10'}">
              Canciones
            </button>
          </div>
        </div>
      </nav>

      <main class="max-w-6xl mx-auto px-6 py-8">
        <div id="content"></div>
      </main>

      <footer class="border-t border-white/5 text-center py-4 text-xs text-gray-600">
        Music API &mdash; NestJS + Vite + TailwindCSS
      </footer>
    </div>
  `;

  const content = document.getElementById('content')!;

  if (view === 'genres') {
    renderGenres(content);
  } else {
    renderSongs(content);
  }

  document.getElementById('nav-genres')!.addEventListener('click', () => render('genres'));
  document.getElementById('nav-songs')!.addEventListener('click', () => render('songs'));
}

render('genres');
