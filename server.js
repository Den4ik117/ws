'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const { WebSocketServer } = require('ws');
const { connection } = require('./database/connect.js');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function (ws) {
    connection.query(`SELECT * FROM messages;`, (err, result) => {
        for (const el of result) {
            ws.send(JSON.stringify({
                event: 'message',
                id: el.id,
                message: el.message,
            }));
        }
    });

    ws.on('error', console.error);

    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                connection.query(`INSERT INTO messages (message) VALUES (?);`, [message.message])
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });

    ws.on('close', function () {
        console.log('User connection closed');
    });
});

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
}

server.listen(8080, function () {
    console.log('Server started on port 8080');
});
