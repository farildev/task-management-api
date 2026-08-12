import app from "./app";
import { env } from "./config/env";
import { pool } from "./config/database";

const start = async () => {
  try{
    await pool.query('select 1');
    console.log('✅ Database connection verified');
    app.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
    })
  }catch(err){
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
