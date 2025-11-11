const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'culinary',
    password: 'Sanzhar123',
    port: 5432,
});

pool.connect()
  .then(() => console.log("Подключено к PostgreSQL"))
  .catch(err => console.error("Ошибка подключения:", err));

module.exports = pool;