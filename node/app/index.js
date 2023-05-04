const express = require('express');

const app =  express()

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const mysql = require('mysql')

const connection = mysql.createConnection(config);

const sqlCreateTableQuery = `CREATE TABLE IF NOT EXISTS people (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL
);`

connection.query(sqlCreateTableQuery);

const sqlInsertQuery = `INSERT INTO people(name) value('Pedro');`
const sqlSelectQuery = `SELECT * from people;`

app.get('/', async (req, res) => {
    await new Promise((resolve, reject) => {
        connection.query(sqlInsertQuery, function (error, results) {
            if (error) {
                reject(error);
                return;
            }

            resolve(results);
        });
    });

    const queryResponse = await new Promise((resolve, reject) => {
        connection.query(sqlSelectQuery, function (error, results) {
            if (error) {
                reject(error);
                return;
            }

            resolve(results);
        });
    });

    const list = queryResponse.map(person => `<li>${person.name}</li>`).join('');

    res.send(`<h1>Hello world full cycle!</h1><ul>${list}</ul>`);
});

app.listen(3000, () => {
    console.log('Running on port 3000!')
});