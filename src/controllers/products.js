const fs = require('fs');

module.exports = class Products {
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

    async save(obj) {
        try {
            const fileContent = await this.#readFile();
            if (fileContent.length !== 0) {
                await fs.promises.writeFile(this.file, JSON.stringify([...fileContent, {
                    ...obj,
                    id: fileContent[fileContent.length - 1].id + 1
                }], null, 2), 'utf-8');

                return 'Object(s) created.';
            } else {
                await fs.promises.writeFile(this.file, JSON.stringify([{
                    ...obj,
                    id: 0
                }]), 'utf-8');

                return 'Object(s) created.';
            }
        } catch (error) {
            return error;
        }
    }

    async modifyById(id, product) {
        try {
            let fileContent = await this.#readFile();
            fileContent = await fileContent.map(e => {
                if (e.id === id) {
                    e = {
                        ...product,
                        id: id
                    };
                    return e;
                } else {
                    return e;
                }
            })
            await fs.promises.writeFile(this.file, JSON.stringify(fileContent, null, 2), 'utf-8');

            return 'Object updated.';
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            const fileContent = await this.#readFile();
            const element = fileContent.find(e => e.id === id)
            return element ? element : 0;
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const fileContent = await this.#readFile();
            return fileContent;
        } catch (error) {
            return error;
        }
    }

    async deleteById(id) {
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
    }

    async deleteAll() {
        try {
            const fileContent = await this.#readFile();
            if (fileContent.length !== 0) {
                await fs.promises.writeFile(this.file, JSON.stringify([])); 
                return 'Array cleared.';
            } else {
                return 'Array already empty.';
            }
        } catch (error) {
            return error;
        }
    }

    async getRandomProduct() {
        try {
            const fileContent = await this.#readFile();
            const randomProduct = fileContent[Math.floor(Math.random() * fileContent.length)];
            return randomProduct;
        } catch (error) {
            return error;
        }
    }
}