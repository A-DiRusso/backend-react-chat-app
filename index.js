const express = require('express');
const app = express();


//this is my db
const db = [
    'Welcome to the chat app'
]
//When Get request comes in send back all the messages
app.get('/', (req, res) => {
    res.json(db);
});

//When Post request comes in add a message to an array of messages.

const PORT = 31337
app.listen(PORT, () => {
    console.log(`You're app is running at PORT: ${PORT}`)
});