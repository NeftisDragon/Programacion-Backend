const knex = require('knex');

module.exports = class Chat {
    constructor(settings, table) {
        this.knex = knex(settings);
        this.table = table;
    }

    async getAll() {
        try {
            return await this.knex.from(this.table).select('*');
        } catch (error) {
            return error;
        }
    }

    async save(message) {
        try {
            await this.knex(this.table).insert(message);
            return 'Message sent.';
        } catch (error) {
            return ('Failed to send message.', error);
        }
    }
}