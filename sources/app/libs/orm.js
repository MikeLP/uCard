const path = require('path');
const assert = require('assert');
const _ = require('lodash');

const dbName = 'db.sqlite';
const dbPath = process.env.NODE_ENV === 'development' ? global.ROOT_DIR + '/../../' : process.resourcesPath + '/app.asar.unpacked/';

//noinspection JSUnresolvedVariable
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(dbPath, 'sources/data/database/' + dbName)
    },
    useNullAsDefault: true
});

/**
 *
 */
class QueryBuilder extends knex.client.QueryBuilder {
    /**
     *
     * @param model
     */
    static set _models(models) {
        let currentModel = this._models || {};
        this['models'] = Object.assign(currentModel, models);
    }

    /**
     *
     * @return {*}
     */
    static get _models() {
        return this['models'];
    }

    /**
     *
     * @returns {Promise}
     */
    first() {
        let models = QueryBuilder._models;
        return new Promise((resolve, reject) => {
            this
                .then(result => {
                    result = result.first();
                    if (result) {
                        let object = new models.primary(result);
                        if (models.secondary) {
                            object[models.secondary.name.replace('Model', '')] =
                                new models.secondary(result);
                        }
                        resolve(object);
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
        let models = QueryBuilder._models;
        return new Promise((resolve, reject) => {
            this
                .then(result => {
                    resolve(result.map(result => {
                        let object = new models.primary(result);
                        if (models.secondary) {
                            object[models.secondary.name.replace('Model', '')] =
                                new models.secondary(result);
                        }
                        return object;
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

    static get name() {
        return this.constructor.name;
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

        QueryBuilder._models = {
            primary: model,
            secondary: throughModel
        };

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
    // static hasMany(model) {}

    /**
     *
     * @param model
     */
    // static hasOne(model) {}

    /**
     *
     * @returns {QueryBuilder}
     */
    static where() {
        QueryBuilder._models = {
            primary: this
        };
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
        QueryBuilder._models = {
            primary: this
        };
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
        QueryBuilder._models = {
            primary: this
        };
        //noinspection JSUnresolvedFunction
        return knex
            .select()
            .from(this.table)
            .where(primaryKey, parseInt(id))
            .limit(1)
            .first();
    }

    static sort() {
        QueryBuilder._models = {
            primary: this
        };
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
        QueryBuilder._models = {
            primary: this
        };
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
            this.parseJSON(properties);
        } else {
            if (_.isArray(this.constructor.properties)) {
                this.constructor.properties.forEach(property => {
                    this[property] = properties[property];
                });
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
