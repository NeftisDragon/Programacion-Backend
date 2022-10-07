const fs = require('fs');

module.exports = class Chat {
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

    async getAll() {
        try {
            const fileContent = await this.#readFile();
            return fileContent;
        } catch (error) {
            return error;
        }
    }

    async save(message) {
        try {
            const fileContent = await this.#readFile();
            let messages = await this.getAll();
            message.date = new Date().toLocaleString("en-US", {timeStyle: "short"});
            messages.push(message);
            await fs.promises.writeFile(this.file, JSON.stringify(messages, null, '\t'));
            return 'Message saved successfully.';
        } catch (error) {
            return ('Failed to save message.', error);
        }
    }
}