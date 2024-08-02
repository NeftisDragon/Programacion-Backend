const express = require('express');
const {
    Router
} = express;

const router = Router();

//Chat -->
router.get('/chat', async (req, res) => {
    return res.render('chat');
})

module.exports = router;