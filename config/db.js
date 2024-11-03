// db.js
const pgp = require("pg-promise")();

const db = pgp({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // allows SSL without certificate validation
  },
});

module.exports = db;
