import { config } from "dotenv";
config();

import { neon } from "@neondatabase/serverless";

async function testConnection() {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`SELECT NOW()`;
  console.log("DB connected", result);
}

testConnection();
