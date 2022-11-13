const {
    Schema,
    model
} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        max: 254,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    overview: {
        type: String,
        max: 320,
        required: true
    }
})

module.exports = model('products', productSchema);