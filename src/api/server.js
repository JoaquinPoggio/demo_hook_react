import express from 'express';
import cors from 'cors';
import pg from 'pg';

// Las columnas DATE se devuelven como texto 'YYYY-MM-DD'
pg.types.setTypeParser(1082, (v) => v);

const pool = new pg.Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tasks',
  port: 5432,
});

const CAMPOS = [
  'nombre_proyecto', 'tipo_actividad', 'estado', 'resumen', 'descripcion',
  'prioridad', 'informador', 'persona_asignada', 'precondicion',
  'fecha_creacion', 'fecha_cierre', 'sprint',
];

const valores = (body) => CAMPOS.map((c) => (body[c] === '' ? null : body[c] ?? null));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(rows);
});

app.post('/tasks', async (req, res) => {
  const marcas = CAMPOS.map((_, i) => `$${i + 1}`).join(', ');
  const { rows } = await pool.query(
    `INSERT INTO tasks (${CAMPOS.join(', ')}) VALUES (${marcas}) RETURNING *`,
    valores(req.body)
  );
  res.status(201).json(rows[0]);
});

app.put('/tasks/:id', async (req, res) => {
  const sets = CAMPOS.map((c, i) => `${c} = $${i + 1}`).join(', ');
  const { rows } = await pool.query(
    `UPDATE tasks SET ${sets} WHERE id = $${CAMPOS.length + 1} RETURNING *`,
    [...valores(req.body), req.params.id]
  );
  rows[0] ? res.json(rows[0]) : res.sendStatus(404);
});

app.patch('/tasks/:id/finish', async (req, res) => {
  const { rows } = await pool.query(
    `UPDATE tasks SET estado = 'Finalizada', fecha_cierre = CURRENT_DATE
     WHERE id = $1 RETURNING *`,
    [req.params.id]
  );
  rows[0] ? res.json(rows[0]) : res.sendStatus(404);
});

app.delete('/tasks/:id', async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  res.sendStatus(rowCount ? 204 : 404);
});

async function iniciar() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      nombre_proyecto TEXT NOT NULL,
      tipo_actividad TEXT,
      estado TEXT,
      resumen TEXT NOT NULL,
      descripcion TEXT,
      prioridad TEXT,
      informador TEXT,
      persona_asignada TEXT,
      precondicion TEXT,
      fecha_creacion DATE,
      fecha_cierre DATE,
      sprint TEXT
    )`);
  app.listen(3000, () => console.log('API lista en el puerto 3000'));
}

iniciar().catch((e) => {
  console.error(e);
  process.exit(1);
});