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
const products = new Products('./src/utils/data.json');

const Chat = require('./src/controllers/chat.js');
const chat = new Chat('./src/utils/chat.json');

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

io.on('connection', async (socket) => {
    console.log('User connected.');

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

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    })
})

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log('Server started on port', server.address().port);
}).on('error', (err) => console.log(err));