import { pool } from "../config/database";
import { User } from "../types";

export const UserModel = {
  findAll: async () : Promise<User[]> => {
    const {rows} = await pool.query('SELECT * FROM users ORDER by created_at DESC');
    return rows;
  },
  findById: async (id: string) : Promise<User | null> => {
    const {rows} = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] ?? null;
  },
  findByEmail: async (email: string) : Promise<User | null> => {
    const {rows} = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] ?? null;
  },
  create : async (name: string,email: string, password: string) : Promise<User> => {
    const {rows} = await pool.query('INSERT INTO users (name, email,password) VALUES ($1, $2, $3) RETURNING *', [name, email,password]);
    return rows[0];
  },
  update: async (id: string, data:Partial<User>) : Promise<User | null> => {
    const {rows} = await pool.query('UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [data.name, id]);
    return rows[0];
  },
  delete: async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return (rowCount ?? 0) > 0;
  },
}
