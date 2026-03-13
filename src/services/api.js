const BASE = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

async function fetchJson(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const message = res.status === 429
      ? "Limite de requisições atingido (429). Aguarde alguns minutos e tente novamente."
      : `Erro ao buscar dados da API (status ${res.status}).`;
    throw new Error(message);
  }

  return res.json();
}

export async function fetchBooks(query) {
  let url = `${BASE}?q=${encodeURIComponent(query)}`;
  if (API_KEY) {
    url += `&key=${API_KEY}`;
  }
  return fetchJson(url);
}

export async function fetchBookById(id) {
  let url = `${BASE}/${id}`;
  if (API_KEY) {
    url += `?key=${API_KEY}`;
  }
  return fetchJson(url);
}
