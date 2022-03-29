const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  port: process.env.DB_PORT,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = pool;
