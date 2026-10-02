import { useState } from 'react';
import { CAMPOS } from './campos';

const hoy = () => new Date().toISOString().slice(0, 10);

const vacio = () => ({
  nombre_proyecto: '', tipo_actividad: 'Tarea', estado: 'Por hacer', resumen: '',
  descripcion: '', prioridad: 'Media', informador: '', persona_asignada: '',
  precondicion: '', fecha_creacion: hoy(), fecha_cierre: '', sprint: '',
});

// Las tareas guardadas pueden traer null: los inputs controlados necesitan texto
const normalizar = (t) =>
  Object.fromEntries(Object.entries({ ...vacio(), ...t }).map(([k, v]) => [k, v ?? '']));

export default function TaskForm({ inicial, onGuardar, onCancelar }) {
  const [form, setForm] = useState(inicial ? normalizar(inicial) : vacio());

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    await onGuardar(form);
    if (!inicial) setForm(vacio());
  };

  return (
    <form className="form" onSubmit={enviar}>
      {CAMPOS.map((c) => (
        <label key={c.name} className={c.largo ? 'ancho' : ''}>
          {c.label}
          {c.opciones ? (
            <select name={c.name} value={form[c.name]} onChange={cambiar}>
              {c.opciones.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : c.largo ? (
            <textarea name={c.name} rows={3} value={form[c.name]} onChange={cambiar} />
          ) : (
            <input
              type={c.tipo || 'text'}
              name={c.name}
              value={form[c.name]}
              onChange={cambiar}
              required={c.required}
            />
          )}
        </label>
      ))}
      <div className="acciones ancho">
        <button type="submit" className="primario">
          {inicial ? 'Guardar cambios' : 'Crear tarea'}
        </button>
        {inicial && (
          <button type="button" onClick={onCancelar}>Cancelar edición</button>
        )}
      </div>
    </form>
  );
}