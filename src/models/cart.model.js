const {
    Schema,
    model
} = require('mongoose');

const cartSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: false
    }
})

module.exports = model('cart', cartSchema);