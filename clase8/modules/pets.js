const express = require('express');
const {
    Router
} = express;

const router = Router();

const pets = []

router.get('/', (req, res) => {
    res.send(pets);
})

router.post('/', (req, res) => {
    const save = req.body;
    pets.push(save);
    res.status(201).send({
        status: "Saved"
    });
})

module.exports = router;