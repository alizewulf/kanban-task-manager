import { Pool } from "pg";

export const pool = new Pool({
    user: "kanban_user",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "kanban"
})