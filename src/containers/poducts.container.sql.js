const knex = require('knex');

module.exports = class Container {
    constructor(settings, table) {
        this.knex = knex(settings);
        this.table = table;
    }

    async save(obj) {
        try {
            await this.knex(this.table).insert(obj);
            return 'Object(s) created.';
        } catch (error) {
            return error;
        }
    }

    async modifyById(id, product) {
        try {
            await this.knex(this.table).where('id', '=', id).update(product);
            return 'Object updated.';
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            return await this.knex.from(this.table).select('*').where('id', '=', id);
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            return await this.knex.from(this.table).select('*');
        } catch (error) {
            return error;
        }
    }

    async deleteById(id) {
        try {
            await this.knex(this.table).where('id', '=', id).del();
            return 'Element removed.';
        } catch (error) {
            return error;
        }
    }

    async deleteAll() {
        try {
            await this.knex(this.table).del();
            return 'Table cleared.';
        } catch (error) {
            return error;
        }
    }
}