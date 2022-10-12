const fs = require('fs');

module.exports = class Cart {
    constructor(file) {
        this.file = file;
    }

    async #readFile() {
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');
            const parsedContent = JSON.parse(content);
            return parsedContent;
        } catch (error) {
            return error;
        }
    }

    async newCart(cart_id) {
        try {
            const fileContent = await this.#readFile();
            if (fileContent.length !== 0) {
                await fs.promises.writeFile(this.file, JSON.stringify([...fileContent, {
                    cart_id: cart_id,
                    timestamp: new Date().toLocaleString("en-US"),
                    products: []
                }], null, 2), 'utf-8');

                return 'Cart created.';
            } else {
                await fs.promises.writeFile(this.file, JSON.stringify([{
                    cart_id: cart_id,
                    timestamp: new Date().toLocaleString("en-US"),
                    products: []
                }]), 'utf-8');

                return 'Cart created.';
            }
        } catch (error) {
            return error;
        }
    }

    async save(obj, cart_id) {
        try {
            const fileContent = await this.#readFile();
            fileContent[cart_id].products.push(obj);
            await fs.promises.writeFile(this.file, JSON.stringify(fileContent, null, 2), 'utf-8');

            return 'Product added!';
        } catch (error) {
            return error;
        }
    }

    async getById(cart_id, id) {
        try {
            const fileContent = await this.#readFile();
            let element = fileContent[cart_id].products[id];
            return element ? element : 'No product matches the ID.';
        } catch (error) {
            return error;
        }
    }

    async getAll(cart_id) {
        try {
            const fileContent = await this.#readFile();
            return fileContent[cart_id].products;
        } catch (error) {
            return error;
        }
    }

    async removeById(cart_id, id) {
        try {
            const fileContent = await this.#readFile();
            const fileCopy = Array.from(fileContent);
            let cart = fileCopy[cart_id].products;
            let element = cart.findIndex(obj => obj.id === id);
            if (element >= 0) {
                cart.splice(element, 1);
                fileCopy.push(cart);
                await fs.promises.writeFile(this.file, JSON.stringify([...fileCopy], null, 2), 'utf-8');

                return 'Product removed.';
            } else {
                return 'Product not found.';
            }
        } catch (error) {
            return error;
        }
    }

    async emptyCart(cart_id) {
        try {
            const fileContent = await this.#readFile();
            let cart = fileContent[cart_id].products;
            if (cart.length !== 0) {
                fileContent[cart_id].products = [];
                await fs.promises.writeFile(this.file, JSON.stringify(fileContent, null, 2), 'utf-8');

                return 'Cart cleared.';
            } else {
                return 'Cart already empty.';
            }
        } catch (error) {
            return error;
        }
    }
}