const express = require('express');
const people = require('./modules/people');
const pets = require('./modules/pets');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/people', people);
app.use('/api/pets', pets);
app.use(express.static('./public'));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Server started on port', server.address().port);
}).on('error', (err) => console.log(err));