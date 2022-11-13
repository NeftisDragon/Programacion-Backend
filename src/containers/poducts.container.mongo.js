const products = require('../models/products.model.js');

module.exports = class Products {

    async save(product) {
        try {
            const newProduct = new products(product);
            await newProduct.save();
            return 'Product created.';
        } catch (error) {
            return error;
        }
    }

    async update(id, product) {
        try {
            await products.updateOne({
                _id: id
            }, {
                $set: product
            });
            return 'Product updated.';
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            const product = await products.findOne({
                _id: id
            });
            return product;
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const elements = await products.find();
            return elements;
        } catch (error) {
            return error;
        }
    }

    async remove(id) {
        try {
            await products.deleteOne({
                _id: id
            });
            return 'Product removed.';
        } catch (error) {
            return error;
        }
    }

    async removeAll() {
        try {
            await products.deleteMany({});
            return 'Collection cleared.';
        } catch (error) {
            return error;
        }
    }
}