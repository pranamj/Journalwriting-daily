// lib/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL,
});

module.exports = pool;
