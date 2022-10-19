const routes = require('./src/routes/routes.js');
const express = require('express');
const app = express();

const {
    Server: HttpServer
} = require('http');
const {
    Server: IOServer
} = require('socket.io');

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const Products = require('./src/containers/products.container.js');
const products = new Products('./src/databases/products.json');

const Chat = require('./src/containers/chat.container.js');
const chat = new Chat('./src/databases/chat.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/', routes);

app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');

app.get('/', (req, res) => {
    res.render('index');
})

app.all('*', (req, res) => {
    res.status(404).send({
        Error: 'Path not found.'
    })
})

//Issue 1: Triggers 2 connections, one for each render.js in /public/scripts:
io.on('connection', async (socket) => {
    console.log('User connected.');

    //Issue 2: triggers connection loop:
    socket.emit('products', await products.getAll());
    socket.on('newProduct', async (product) => {
        await products.save(product);
        io.sockets.emit('products', await products.getAll());
    })

    socket.emit('messages', await chat.getAll());
    socket.on('newMessage', async (message) => {
        await chat.save(message);
        io.sockets.emit('messages', await chat.getAll());
    })
    //Issue 2 end.

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    })
})
//Issue 1 end.

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log('Server started on port', server.address().port);
}).on('error', (err) => console.log(err));