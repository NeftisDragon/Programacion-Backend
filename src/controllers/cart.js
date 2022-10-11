const fs = require('fs');

class Cart {
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

    async newCart() {
        try {
            const fileContent = await this.#readFile();
            if (fileContent.length !== 0) {
                await fs.promises.writeFile(this.file, JSON.stringify([...fileContent, {
                    cart_id: fileContent[fileContent.length - 1].cart_id + 1,
                    timestamp: new Date().toLocaleString("en-US"),
                    products: []
                }], null, 2), 'utf-8');

                return 'Cart created.';
            } else {
                await fs.promises.writeFile(this.file, JSON.stringify([{
                    cart_id: 0,
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

            return 'Object(s) created.';
        } catch (error) {
            return error;
        }
    }

    /* async getById(id) {
        const fileContent = await this.#readFile();
        const element = fileContent.find(e => e.id === id)
        return element ? element : 0;
    } */

    async getAll(cart_id) {
        try {
            const fileContent = await this.#readFile();
            return fileContent[cart_id].products;
        } catch (error) {
            return error;
        }
    }

    /* async deleteById(id) {
        try {
            const fileContent = await this.#readFile();
            const fileCopy = Array.from(fileContent);
            const element = fileCopy.findIndex(obj => obj.id === id);
            if (element >= 0) {
                fileCopy.splice(element, 1);
                await fs.promises.writeFile(this.file, JSON.stringify([...fileCopy], null, 2), 'utf-8');

                return 'Element removed.';
            } else {
                return 'Element not found.';
            }
        } catch (error) {
            return error;
        }
    } */

    async emptyCart(cart_id) {
        try {
            const fileContent = await this.#readFile();
            let cart = fileContent[cart_id].products;
            if (cart.length !== 0) {
                fileContent[cart_id].products = [];
                await fs.promises.writeFile(this.file, JSON.stringify(fileContent, null, 2), 'utf-8');

                return 'Array cleared.';
            } else {
                return 'Array is already empty.';
            }
        } catch (error) {
            return error;
        }
    }
}

const cart = new Cart('./src/databases/cart.json');

const prod = {
    name: "Eval plushy",
    price: 0,
    description: "A cute plushy."
}

async function call() {
    console.log(await cart.getAll(2));
}

call();