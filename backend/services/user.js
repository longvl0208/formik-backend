const shajs = require('sha.js');
const db = require('../sql/db');

const SECRET = process.env.SECRET || 'test-dev-secret';
/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

const authenticateUser = async (email, password) => {
  console.log('Email', email);
  console.log('password', password);
  const hash = hashPassword(email, password);
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName
              FROM users s
              WHERE email = $1 AND password = $2`,
    values: [email, hash],
  };
  console.log('db', db);
  // const client = await db.connect();
  // console.log('client', client);
  try {
    // const { rows } = await db.connect();
    const res = await db.query(queryText.text, queryText.values);
    console.log('----------------------', res.rows[0]);
    if (res.rows[0]) {
      const user = res.rows[0];
      return user;
    }
    throw (new Error('Bad credentials'));
  } catch (error) {
    console.log('Error when query', error.stack);
    throw (new Error('Bad credentials'));
  } finally {
    // db.end();
  }
};

module.exports = {
  authenticateUser,
};
