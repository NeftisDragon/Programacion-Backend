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

router.post('/', async (req, res) => {
    const saveProduct = req.body;
    res.status(201).send(await container.save(saveProduct));
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
        /* product = Object.keys(product).forEach(key => key = req.body);
        res.status(201).send(await container.modifyById(id, product)); */
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