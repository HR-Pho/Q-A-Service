const { Pool } = require('pg');
const { host, user, database, password, port } = require('../config');

const pool = new Pool({
    host,
    user,
    database,
    password,
    port,
});

pool.connect();

module.exports.pool = pool;
