const products = require('./modules/products');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/', products);
app.use(express.static('./clase8/public'));

/* app.get('/', (req, res) => {
    res.send(`<h1 style="color:blue">Hello World!</h1>`)
}) */

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Server started on port', server.address().port);
}).on('error', (err) => console.log(err));