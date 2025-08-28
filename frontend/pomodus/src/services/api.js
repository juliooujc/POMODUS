// src/services/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000';

export const getAuthToken = () => localStorage.getItem('pomodus_token');

async function request(method, path, body, token = getAuthToken()) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  // tenta parsear JSON, mas tolera respostas vazias
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Erro ${method} ${path}`);
  }
  return data;
}

export const apiGet = (path, token) => request('GET', path, null, token);
export const apiPost = (path, body, token) => request('POST', path, body, token);
export const apiPut = (path, body, token) => request('PUT', path, body, token);
export const apiDelete = (path, token) => request('DELETE', path, null, token);
export { API_BASE };
