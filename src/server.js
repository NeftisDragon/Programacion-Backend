const products = require('./modules/products');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/', products);

app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Server started on port', server.address().port);
}).on('error', (err) => console.log(err));