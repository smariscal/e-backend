const dotenv = require("dotenv");
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST || "127.0.0.1";
const DATABASE_PORT = process.env.DATABASE_PORT || "3307";
const DATABASE_USER = process.env.DATABASE_USER || "coder";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "coder";
const DATABASE_NAME = process.env.DATABASE_NAME || "desafiobasedatos";

// console.log(DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD);
const knexConfig = {
  client: 'mysql',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    dateStrings: true
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  }
}

module.exports = knexConfig;

// Crear una nueva migración:
// knex migrate:make <nombre_migracion>

// Creare una nueva seed (Data inicial):
// knex seed:make <nombre_seed>