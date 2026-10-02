const URL_API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function pedir(ruta, metodo = 'GET', cuerpo) {
  const res = await fetch(`${URL_API}${ruta}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const api = {
  listar: () => pedir('/tasks'),
  crear: (datos) => pedir('/tasks', 'POST', datos),
  actualizar: (id, datos) => pedir(`/tasks/${id}`, 'PUT', datos),
  finalizar: (id) => pedir(`/tasks/${id}/finish`, 'PATCH'),
  eliminar: (id) => pedir(`/tasks/${id}`, 'DELETE'),
};