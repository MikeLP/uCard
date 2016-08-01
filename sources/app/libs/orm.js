const path = require('path');
const assert = require('assert');

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
        return new Promise((resolve, reject) => {
            this
                .then(result => {
                    result = result.first();
                    if (result) {
                        resolve(new QueryBuilder.model(result));
                    } else {
                        resolve(null);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     *
     * @returns {Promise}
     */
    all() {
        return new Promise((resolve, reject) => {
            this
                .then(result => {
                    resolve(result.map(item => {
                        return new QueryBuilder.model(item);
                    }));
                })
                .catch(error => {
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
     * @returns {string}
     */
    static get primaryKey() {
        return 'id';
    }

    /**
     *
     * @returns {null}
     */
    static get foreignKey() {
        return null;
    }

    /**
     *
     * @param model
     * @param throughModel
     * @param foreignKey
     * @returns {*}
     */
    static hasManyThrough(model, throughModel, foreignKey) {
        assert.deepEqual(model.prototype, Model);
        assert.deepEqual(throughModel.prototype, Model);
        assert(foreignKey);

        return model.select().leftJoin(
            throughModel.table,
            model.table + '.' + model.primaryKey,
            throughModel.table + '.' + foreignKey
        );
    }

    /**
     *
     * @param model
     */
    static hasMany(model) {
    }

    /**
     *
     * @param model
     */
    static hasOne(model) {
    }

    /**
     *
     * @returns {QueryBuilder}
     */
    static where() {
        QueryBuilder.model = this;
        //noinspection JSUnresolvedFunction
        return knex
            .select()
            .from(this.table)
            .where(...arguments);
    }

    /**
     *
     * @returns {QueryBuilder}
     */
    static select() {
        QueryBuilder.model = this;
        //noinspection JSUnresolvedFunction
        return knex
            .select(...arguments)
            .from(this.table);
    }

    /**
     *
     * @param id
     * @returns {Promise}
     */
    static find(id) {
        let primaryKey = this.primaryKey ? this.primaryKey : 'id';
        QueryBuilder.model = this;
        //noinspection JSUnresolvedFunction
        return knex
            .select()
            .from(this.table)
            .where(primaryKey, parseInt(id))
            .limit(1)
            .first();
    }

    static sort() {
        QueryBuilder.model = this;
        //noinspection JSUnresolvedFunction
        return knex
            .select()
            .from(this.table)
            .orderBy(...arguments);
    }

    /**
     *
     * @returns {Promise}
     */
    static all() {
        QueryBuilder.model = this;
        //noinspection JSUnresolvedFunction
        return knex
            .select()
            .from(this.table)
            .all();
    }

    /**
     *
     * @param properties
     */
    constructor(properties) {
        if (_.isFunction(this.parseJSON)) {
            //noinspection JSUnresolvedFunction
            this.parseJSON(properties)
        } else {
            if (_.isArray(Model.properties)) {
                for (let property in properties) {
                    if (properties.hasOwnProperty(property) && Model.properties.contains(property)) {
                        this[property] = properties[property];
                    }
                }
            } else {
                for (let property in properties) {
                    if (properties.hasOwnProperty(property)) {
                        this[property] = properties[property];
                    }
                }
            }
        }

    }

    /**
     *
     */
    toJSON() {
        return JSON.stringify(Object.assign({}, this));
    }

    /**
     *
     */
    toObject() {
        return JSON.parse(this.toJSON());
    }
}

module.exports = Model;