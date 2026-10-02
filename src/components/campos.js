export const CAMPOS = [
  { name: 'nombre_proyecto', label: 'Nombre del proyecto', required: true },
  { name: 'tipo_actividad', label: 'Tipo de actividad', opciones: ['Tarea', 'Bug', 'Historia', 'Épica'] },
  { name: 'estado', label: 'Estado', opciones: ['Por hacer', 'En curso', 'En revisión', 'Finalizada'] },
  { name: 'resumen', label: 'Resumen', required: true },
  { name: 'descripcion', label: 'Descripción', largo: true },
  { name: 'prioridad', label: 'Prioridad', opciones: ['Baja', 'Media', 'Alta', 'Crítica'] },
  { name: 'informador', label: 'Informador' },
  { name: 'persona_asignada', label: 'Persona asignada' },
  { name: 'precondicion', label: 'Precondición', largo: true },
  { name: 'fecha_creacion', label: 'Fecha de creación', tipo: 'date' },
  { name: 'fecha_cierre', label: 'Fecha de cierre', tipo: 'date' },
  { name: 'sprint', label: 'Sprint' },
];