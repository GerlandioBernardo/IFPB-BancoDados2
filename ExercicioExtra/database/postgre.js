import 'dotenv/config'
import pg from "pg";
const {Pool} = pg;
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_BD,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})
export default pool;