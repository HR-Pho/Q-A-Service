const { Pool } = require('pg');
const { host, user, database, password, port } = require('./config');

const pool = new Pool({
    host,
    user,
    database,
    password,
    port,
});

pool.connect();
pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  pool.end()
});

// module.exports = {
//     query: (text, params, callback) => {
//         return pool.query(text, params, callback);
//     },
//     connect: (err, client, done) => {
//         return pool.connect(err, client, done);
//     },
// };

