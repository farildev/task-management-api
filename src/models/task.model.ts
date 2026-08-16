import { pool } from '../config/database';
import { Task } from '../types';

export const TaskModel = {
  findAll: async (projectId: string): Promise<Task[]> => {
    const { rows } = await pool.query(
      `SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC`,
      [projectId]
    );
    return rows;
  },

  findById: async (id: string): Promise<Task | null> => {
    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
    );
    return rows[0] ?? null;
  },

  create: async (
    title: string,
    description: string | null,
    projectId: string,
    createdBy: string,
    assignedTo: string | null,
    priority: string,
    dueDate: Date | null
  ): Promise<Task> => {
    const { rows } = await pool.query(
      `INSERT INTO tasks (title, description, project_id, created_by, assigned_to, priority, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, projectId, createdBy, assignedTo, priority, dueDate]
    );
    return rows[0];
  },

  update: async (id: string, data: Partial<Task>): Promise<Task | null> => {
    const { rows } = await pool.query(
      `UPDATE tasks SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        status = COALESCE($3, status),
        priority = COALESCE($4, priority),
        assigned_to = COALESCE($5, assigned_to),
        due_date = COALESCE($6, due_date),
        updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [data.title, data.description, data.status, data.priority, data.assigned_to, data.due_date, id]
    );
    return rows[0] ?? null;
  },

  delete: async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(
      'DELETE FROM tasks WHERE id = $1',
      [id]
    );
    return (rowCount ?? 0) > 0;
  },
};
