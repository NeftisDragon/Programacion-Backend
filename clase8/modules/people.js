const express = require('express');
const {
    Router
} = express;

const router = Router();

const people = [];

router.get('/', (req, res) => {
    res.send(people);
})

router.post('/', (req, res) => {
    const save = req.body;
    people.push(save);
    res.status(201).send({
        status: "Saved"
    });
})

module.exports = router;