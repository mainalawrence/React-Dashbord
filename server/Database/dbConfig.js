import dotenv from 'dotenv';
import  pgk from 'pg'

const {Pool} = pgk;
dotenv.config();

const pool = new Pool({

    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME,
    host:process.env.DB_HOST,
    port: 5432

})

export default pool;
