const path = require('path');

//noinspection JSUnresolvedVariable
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(
            process.env.NODE_ENV === 'development' ?
            global.ROOT_DIR + '/../../' : process.resourcesPath + '/app.asar.unpacked/',
            'sources/database/db.sqlite3')
    },
    useNullAsDefault: true
});

const _ = require('lodash');

/**
 *
 * @param string
 * @returns {boolean}
 */
function isJson(string) {
    if (_.isString(string)) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }
    return false;
}

/**
 *
 */
class QueryBuilder extends knex.client.QueryBuilder {
    /**
     *
     * @param model
     */
    static set model(model) {
        this['modelClass'] = model;
    }

    /**
     *
     * @returns {*}
     */
    static get model() {
        return this['modelClass'];
    }


    /**
     *
     * @returns {Promise}
     */
    first() {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.then(function (result) {
                resolve(new QueryBuilder.model(result.first()));
            })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    /**
     *
     * @returns {Promise}
     */
    all() {
        let self = this;
        return new Promise(function (resolve, reject) {
            //noinspection JSUnresolvedFunction
            self.then(function (result) {
                resolve(result.map((item) => {
                    return new QueryBuilder.model(item);
                }));
            })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    /**
     *
     * @returns {*|Array|QueryBuilder}
     */
    sort() {
        return this.orderBy(...arguments);
    }

    /**
     *
     * @returns {*|QueryBuilder}
     */
    take() {
        return this.limit(...arguments);
    }

    /**
     *
     * @returns {*|QueryBuilder}
     */
    skip() {
        return this.offset(...arguments);
    }
}

knex.client['QueryBuilder'] = QueryBuilder;

class Model {
    /**
     *
     * @param properties
     */
    constructor(properties) {
        for (let property in properties) {
            if (properties.hasOwnProperty(property)) {
                this[property] = isJson(properties[property]) ? JSON.parse(properties[property]) : properties[property];
            }
        }
    }

    /**
     *
     * @returns {QueryBuilder}
     */
    static where() {
        let self = this;
        QueryBuilder.model = this;
        return knex
            .select()
            .from(self.table)
            .where(...arguments);
    }

    /**
     *
     * @param id
     * @returns {Promise}
     */
    static find(id) {
        let primaryKey = this.primaryKey ? this.primaryKey : 'id';
        let self = this;
        QueryBuilder.model = this;
        return knex
            .select()
            .from(self.table)
            .where(primaryKey, parseInt(id))
            .limit(1)
            .first();
    }

    static sort() {
        let self = this;
        QueryBuilder.model = this;
        return knex
            .select()
            .from(self.table)
            .orderBy(...arguments);
    }

    /**
     *
     * @returns {Promise}
     */
    static all() {
        let self = this;
        QueryBuilder.model = this;
        //noinspection JSUnresolvedFunction
        return knex
            .select()
            .from(self.table)
            .all();
    }
}
// const bookshelf = require('bookshelf')(knex);

// module.exports = bookshelf.Model;
module.exports = Model;