import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/ecommerce",
});

pool
  .connect()
  .then((client) => {
    console.log("Connect to the Postgres!");
    client.release();
  })
  .catch((err) => {
    console.error("Error to connect:", err);
  });

export default pool;
