const Container = require('../index.js');
const express = require('express');
const {
    Router
} = express;

const router = Router();

const container = new Container('./clase8/data.json');


router.get('/products', async (req, res) => {
    res.status(200).send(await container.getAll());
})

router.get('/products/:id', async (req, res) => {
    const {
        id
    } = req.params;

    const products = await container.getById(id);
    if (products === 0) {
        res.status(400).send({
            error: 'Product not found.'
        });
    } else {
        res.status(200).send(products);
    }
})

router.post('/', async (req, res) => {
    const saveProduct = req.body;
    res.status(201).send(await container.save(saveProduct));
})

module.exports = router;