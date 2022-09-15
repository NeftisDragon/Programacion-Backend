const express = require('express');
const app = express();

const phrase = 'Hello World! How are you?';

app.get('/api/phrase', (req, res) => {
    res.status(200).json({
        phrase: phrase
    });
})

app.get('/api/letters/:num', (req, res) => {
    const {
        num
    } = req.params;
    if (isNaN(num)) {
        res.status(400).json({
            error: 'The parameter is not a number.'
        });
    } else if (num > 11) {
        res.status(400).json({
            error: 'The parameter is out of range.'
        });
    } else {
        res.status(200).json({
            letter: Array.from(phrase)[num]
        });
    }
})

app.get('/api/words/:num', (req, res) => {
    const {
        num
    } = req.params;
    if (isNaN(num)) {
        res.status(400).json({
            error: 'The parameter is not a number.'
        });
    } else if (num > 4) {
        res.status(400).json({
            error: 'The parameter is out of range.'
        });
    } else {
        res.status(200).json({
            word: phrase.split(' ')[num]
        });
    }
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Server started on port', server.address().port);
}).on('error', (err) => console.log(err));