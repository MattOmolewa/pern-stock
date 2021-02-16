const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pernstack",
  password: "matthew667",
  port: 5432,
});

module.exports = pool;
