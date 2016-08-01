const Model = require('../libs/orm');


class ProclaimerModel extends Model {
    static get table() {
        return 'proclaimers';
    }

    get cards() {

    }
}

/**
 *
 * @type {ProclaimerModel}
 */
module.exports = ProclaimerModel;