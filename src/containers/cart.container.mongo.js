const mongoose = require('mongoose');
const cart = require('../models/cart.model.js');

module.exports = class Cart {

    async newCart() {
        try {
            const newCart = new cart();
            newCart.timestamp = new Date().toLocaleString("en-US");
            await newCart.save();
            return 'Cart created.'
        } catch (error) {
            return error;
        }
    }

    async save(obj, cart_id) {
        try {
            await cart.updateOne({
                _id: cart_id
            }, {
                $set: {
                    products: [obj]
                }
            });
            return 'Product added!';
        } catch (error) {
            return error;
        }
    }

    async getAllProducts(cart_id) {
        try {
            const products = await cart.find({
                _id: cart_id
            }, {
                _id: 0,
                products: 1
            });
            return products;
        } catch (error) {
            return error;
        }
    }

    async removeProductById(cart_id, id) {
        try {
            cart.updateOne({
                _id: mongoose.Types.ObjectId(cart_id)
            }, {
                $pull: {
                    products: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                }
            })
            return 'Product removed.';
        } catch (error) {
            return error;
        }
    }

    async emptyCart(cart_id) {
        try {
            await cart.updateOne({
                _id: cart_id
            }, {
                $set: {
                    products: []
                }
            });
            return 'Cart cleared.';
        } catch (error) {
            return error;
        }
    }

    async removeCart(cart_id) {
        try {
            await cart.deleteOne({
                _id: cart_id
            });
            return 'Cart removed.';
        } catch (error) {
            return error;
        }
    }

    async removeAll() {
        try {
            await cart.deleteMany({});
            return 'All carts removed.';
        } catch (error) {
            return error;
        }
    }
}