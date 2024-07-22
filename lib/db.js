// lib/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "user=postgres.zdplxszvlpqebmhvwetn password=[YOUR-PASSWORD] host=aws-0-ap-south-1.pooler.supabase.com port=6543 dbname=postgres"
});

module.exports = pool;
