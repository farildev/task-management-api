import { pool } from '../config/database';
import { Comment } from '../types';

export const CommentModel = {
  findAll: async (taskId: string): Promise<Comment[]> => {
    const { rows } = await pool.query(
      `SELECT c.*, u.name as user_name
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.task_id = $1
       ORDER BY c.created_at ASC`,
      [taskId]
    );
    return rows;
  },

  findById: async (id: string): Promise<Comment | null> => {
    const { rows } = await pool.query(
      'SELECT * FROM comments WHERE id = $1',
      [id]
    );
    return rows[0] ?? null;
  },

  create: async (content: string, taskId: string, userId: string): Promise<Comment> => {
    const { rows } = await pool.query(
      `INSERT INTO comments (content, task_id, user_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [content, taskId, userId]
    );
    return rows[0];
  },

  delete: async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(
      'DELETE FROM comments WHERE id = $1',
      [id]
    );
    return (rowCount ?? 0) > 0;
  },
};
