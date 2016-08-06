const Model = require('../libs/orm');


class ProclaimerModel extends Model {
    static get table() {
        return 'proclaimers';
    }

    get fullName() {
        return this.name + ' ' + this.surname;
    }

    get cards() {

    }
}

/**
 *
 * @type {ProclaimerModel}
 */
module.exports = ProclaimerModel;