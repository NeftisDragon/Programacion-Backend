const Container = require('../index.js');
const express = require('express');
const {
    Router
} = express;

const router = Router();

const container = new Container('./src/data.json');

router.post('/', async (req, res) => {
    const saveProduct = req.body;
    await container.save(saveProduct);
    res.status(201).redirect('/api/products');
})

router.get('/products', async (req, res) => {
    res.render('table', {
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

module.exports = router;