//uses pg library to configure server connection to database.
const Pool = require('pg').Pool;

//instance the pool: how and where to connect to database
const pool = new Pool({
    user: 'artope',
    host: 'localhost',
    port: 5432,
    database: 'authtodolist'
});

//exports the instance
module.exports = pool;