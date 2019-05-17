
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app); //to create a plain vanilla http server that uses our express app
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    server,        // piggy backing on the plain http server 
    path: '/chat',  // listen on only one route, allowing express to conitue to listen on its custom routes
});

app.use(express.urlencoded({extended: true}));//extended: true means we can send nested data

//this is my db
const db = [
    'Welcome to the chat app'
]

wss.on('connection', (socket) => {
    console.log('Oh boy, a new connection!');
    socket.send(JSON.stringify(db));
    socket.on('message', (data) => {
        console.log(data);
        db.push(data);
        console.log(db);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
        // socket.send(data);
    });
});

//When Get request comes in send back all the messages
app.get('/api', (req, res) => {
    res.json(db);
});

//When Post request comes in add a message to an array of messages.
app.post('/api', (req, res) => {
    console.log(req.body.message);
    db.push(req.body.message)
    res.json({
        // 'message': req.body.message // this responds with the message
        db // this send the whole db back
    })
});
const PORT = 31337
server.listen(PORT, () => {
    console.log(`Your app is running at PORT: ${PORT}`)
});