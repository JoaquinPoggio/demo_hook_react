import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { api } from './api/client';
import './App.css';
import './tareas.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      setTareas(await api.listar());
      setError('');
    } catch {
      setError('No se pudo conectar con el servidor. Verificá que el backend esté levantado.');
    }
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (datos) => {
    if (editando) await api.actualizar(editando.id, datos);
    else await api.crear(datos);
    setEditando(null);
    await cargar();
  };

  const eliminar = async (t) => {
    if (!confirm(`¿Eliminar la tarea "${t.resumen}"?`)) return;
    await api.eliminar(t.id);
    if (editando?.id === t.id) setEditando(null);
    await cargar();
  };

  const finalizar = async (t) => {
    await api.finalizar(t.id);
    await cargar();
  };

  return (
    <>
      <Header />
      <main className="tareas">
        <h1>Gestor de tareas</h1>
        {error && <p className="error">{error}</p>}

        <section>
          <h2>{editando ? `Editando tarea #${editando.id}` : 'Nueva tarea'}</h2>
          <TaskForm
            key={editando?.id ?? 'nueva'}
            inicial={editando}
            onGuardar={guardar}
            onCancelar={() => setEditando(null)}
          />
        </section>

        <section>
          <h2>Listado de tareas</h2>
          <TaskList
            tareas={tareas}
            onEditar={(t) => { setEditando(t); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onEliminar={eliminar}
            onFinalizar={finalizar}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;