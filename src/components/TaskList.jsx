import { CAMPOS } from './campos';

export default function TaskList({ tareas, onEditar, onEliminar, onFinalizar }) {
  if (tareas.length === 0) {
    return <p className="vacio">Todavía no hay tareas. Completá el formulario para crear la primera.</p>;
  }

  return (
    <div className="tabla-scroll">
      <table>
        <thead>
          <tr>
            {CAMPOS.map((c) => <th key={c.name}>{c.label}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t) => (
            <tr key={t.id} className={t.estado === 'Finalizada' ? 'finalizada' : ''}>
              {CAMPOS.map((c) => <td key={c.name}>{t[c.name] ?? '—'}</td>)}
              <td className="acciones">
                <button onClick={() => onEditar(t)}>Editar</button>
                <button
                  className="ok"
                  disabled={t.estado === 'Finalizada'}
                  onClick={() => onFinalizar(t)}
                >
                  Finalizar
                </button>
                <button className="peligro" onClick={() => onEliminar(t)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}