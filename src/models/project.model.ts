import { pool } from "../config/database";
import { Project } from "../types";

export const ProjectModel = {
  findAll: async (userId: string, limit: number, offset: number): Promise<{ rows: Project[], total: number }> => {
  const { rows } = await pool.query(
    `SELECT * FROM projects WHERE owner_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  const { rows: countRows } = await pool.query(
    `SELECT COUNT(*) FROM projects WHERE owner_id = $1`,
    [userId]
  );
  return { rows, total: parseInt(countRows[0].count) };
},
  findById : async (id: string) : Promise<Project | null> => {
    const {rows} = await pool.query('SELECT * FROM projects WHERE ID = $1', [id]);
    return rows[0] ?? null
  },
  create: async (name:string, description: string|null, ownerId: string) : Promise<Project> => {
     const {rows} = await pool.query('INSERT INTO projects(name, description, owner_id) VALUES ($1, $2, $3) RETURNING *');

     return rows[0];
  },
  update: async (id: string, data: Partial<Project>) : Promise<Project | null> => {
    const {rows} = await pool.query('UPDATE projects SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *', [data.name, data.description, id]);

    return rows[0] ?? null;
  },
  delete : async (id: string) : Promise<boolean> => {
    const {rowCount} = await pool.query('DELETE FROM projects WHERE id = $1', [id]);

    return (rowCount ?? 0) > 0
  }
}
