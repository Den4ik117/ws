const { createConnection } = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

module.exports = {
    connection,
};