const API_URL = 'http://localhost:3000';

export interface Genre {
  id: number;
  name: string;
  description: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  genreId: number;
}

export type CreateGenre = Omit<Genre, 'id'>;
export type UpdateGenre = Partial<CreateGenre>;
export type CreateSong = Omit<Song, 'id'>;
export type UpdateSong = Partial<CreateSong>;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || res.statusText);
  }
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T;
  }
  return res.json();
}

// ----- Géneros -----
export const genresApi = {
  getAll: () => request<Genre[]>('/genres'),
  getById: (id: number) => request<Genre>(`/genres/${id}`),
  create: (data: CreateGenre) =>
    request<Genre>('/genres', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: UpdateGenre) =>
    request<Genre>(`/genres/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<void>(`/genres/${id}`, { method: 'DELETE' }),
};

// ----- Canciones -----
export const songsApi = {
  getAll: (genreId?: number) =>
    request<Song[]>(genreId ? `/songs?genreId=${genreId}` : '/songs'),
  getById: (id: number) => request<Song>(`/songs/${id}`),
  create: (data: CreateSong) =>
    request<Song>('/songs', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: UpdateSong) =>
    request<Song>(`/songs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<void>(`/songs/${id}`, { method: 'DELETE' }),
};
