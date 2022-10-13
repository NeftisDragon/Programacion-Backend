const express = require('express');
const {
    Router
} = express;

const router = Router();

var admin = true;

const Cart = require('../controllers/cart.js');
const cart = new Cart('./src/databases/cart.json');

const Container = require('../controllers/products.js');
const container = new Container('./src/databases/data.json');

const randomId = () => {
    min = Math.ceil(0);
    max = Math.floor(10000);
    const cart_id = Math.floor(Math.random() * (max - min + 1)) + min;
    return cart_id;
}

var cart_id = '';

//Cart -->
router.get('/cart', async (req, res) => {
    res.render('cart');
    cart_id = randomId();
    return res.status(201).send(await cart.newCart(cart_id));
})

router.delete('/cart/:cart_id', async (req, res) => {
    let {
        cart_id
    } = req.params;

    cart_id = parseInt(cart_id);
    return res.status(201).send(await cart.emptyCart(cart_id));
})

router.get('/cart/:cart_id/products', async (req, res) => {
    let {
        cart_id
    } = req.params;

    cart_id = parseInt(cart_id);
    return res.status(200).send(await cart.getAll(cart_id));
})

router.post('/cart/:cart_id/products', async (req, res) => {
    let {
        cart_id
    } = req.params;

    cart_id = parseInt(cart_id);
    let [id] = req.body;
    let item = await container.getById(id);
    return res.status(201).send(await cart.save(item, cart_id));
})

router.delete('/cart/:cart_id/products/:id', async (req, res) => {
    let {
        cart_id,
        id
    } = req.params;

    cart_id = parseInt(cart_id);
    id = parseInt(id);
    return res.status(201).send(await cart.removeById(cart_id, id));
})

//Chat -->
router.get('/chat', async (req, res) => {
    return res.render('chat');
})

//Products -->
router.post('/', async (req, res) => {
    const saveProduct = req.body;
    await container.save(saveProduct);
    return res.status(201).redirect('/api/products');
})

router.get('/products', async (req, res) => {
    return res.render('cards', {
        products: await container.getAll(),
        message: "No products found"
    });
})

router.get('/products/:id', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    const product = await container.getById(id);
    if (product === 0) {
        return res.status(400).send({
            error: 'Product not found.'
        });
    } else {
        return res.status(200).send(product);
    }
})

router.put('/products/:id', async (req, res) => {
    if (admin === true) {
        let {
            id
        } = req.params;

        id = parseInt(id);

        let product = await container.getById(id);

        if (product === 0) {
            return res.status(400).send({
                error: 'Product not found.'
            });
        } else {
            product = req.body;
            return res.status(201).send(await container.modifyById(id, product));
        }
    } else {
        return res.status(401).send({
            Error: 'Missing or insufficient permissions.'
        });
    }
})

router.delete('/products/:id', async (req, res) => {
    if (admin === true) {
        let {
            id
        } = req.params;

        id = parseInt(id);
        return res.status(201).send(await container.deleteById(id));
    } else {
        return res.status(401).send({
            Error: 'Missing or insufficient permissions.'
        });
    }
})

module.exports = router;