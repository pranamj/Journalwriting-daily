// lib/db.js
const { Pool } = require('pg');

const pool = new Pool({
connectionString:"postgresql://postgres.zdplxszvlpqebmhvwetn:CatchCatfishXYZ_demourl@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
});

module.exports = pool;
