const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));//extended: true means we can send nested data

//this is my db
const db = [
    'Welcome to the chat app'
]
//When Get request comes in send back all the messages
app.get('/', (req, res) => {
    res.json(db);
});

//When Post request comes in add a message to an array of messages.
app.post('/', (req, res) => {
    console.log(req.body.message);
    db.push(req.body.message)
    res.json({
        // 'message': req.body.message
        db
    })
});
const PORT = 31337
app.listen(PORT, () => {
    console.log(`You're app is running at PORT: ${PORT}`)
});