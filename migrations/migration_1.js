import { connection } from '../database/connect.js';

connection.query(
    `CREATE TABLE messages (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        message varchar(255) NOT NULL
     );`,
    function (err, results, fields) {
        console.error(err);
        console.log(results);
        console.log(fields);
    }
);