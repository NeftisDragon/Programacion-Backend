const routeProducts = require('./src/routes/routes.js');
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

const Products = require('./src/controllers/products.js');
const products = new Products('./src/databases/data.json');

const Chat = require('./src/controllers/chat.js');
const chat = new Chat('./src/databases/chat.json');

const Cart = require('./src/controllers/cart.js');
const cart = new Cart('./src/databases/cart.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/', routeProducts);

app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');

app.get('/', (req, res) => {
    res.render('index');
})

const randomId = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const cart_id = Math.floor(Math.random() * (max - min + 1)) + min;
    return cart_id;
}

var cart_id = '';

//Issue 1: Triggers 2 connections, one for each render.js in /public/scripts:
io.on('connection', async (socket) => {
    console.log('User connected.');
    cart_id = randomId(0, 1000);
    /* await cart.newCart(cart_id); */

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
    
    //Issue 3: server restarts:
    socket.emit('cart', await cart.newCart(cart_id));
    socket.on('newItem', async (cart_id, id) => {
        await cart.save(cart_id, id);
        io.sockets.emit('cart', await cart.getAll(cart_id));
    })
    //Issue 3 end.

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    })
})
//Issue 1 end.

exports.cart_id = cart_id;

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log('Server started on port', server.address().port);
}).on('error', (err) => console.log(err));