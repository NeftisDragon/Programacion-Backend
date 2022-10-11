const Container = require('../controllers/products.js');
const express = require('express');
const {
    Router
} = express;

const router = Router();

const container = new Container('./src/databases/data.json');

router.get('/chat', async (req, res) => {
    res.render('chat');
})

router.post('/', async (req, res) => {
    const saveProduct = req.body;
    await container.save(saveProduct);
    res.status(201).redirect('/api/products');
})

router.get('/products', async (req, res) => {
    res.render('cards', {
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
        res.status(400).send({
            error: 'Product not found.'
        });
    } else {
        res.status(200).send(product);
    }
})

router.put('/products/:id', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    let product = await container.getById(id);

    if (product === 0) {
        res.status(400).send({
            error: 'Product not found.'
        });
    } else {
        product = req.body;
        res.status(201).send(await container.modifyById(id, product));
    }
})

router.delete('/products/:id', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);
    res.status(201).send(await container.deleteById(id));
})

router.get('/cart', async (req, res) => {
    res.render('cart');
})

module.exports = router;