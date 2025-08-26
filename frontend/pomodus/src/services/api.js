// src/services/api.js

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000';

export async function apiPost(path, body, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || 'Erro ao comunicar com a API');
  }
  return data;
}
