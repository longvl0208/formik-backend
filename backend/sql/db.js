const { Pool } = require('pg');
const chalk = require('chalk');

// PG_USER=thminsight
// PG_PASSWORD=coding_test_password
// PG_HOST=localhost
// PG_PORT=5432
// PG_DATABASE=thm_database
// SECRET=test-dev-secret

const pool = new Pool({
  user: 'thminsight',
  host: 'database',
  database: 'thm_database',
  password: 'coding_test_password',
  port: '5432',
});

pool.on('error', (err) => {
  console.log(chalk.hex('#34ace0').bold(err));
});

module.exports = pool;
