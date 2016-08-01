const Model = require('../libs/orm');


class ProclaimerCardModel extends Model {
    static get table() {
        return 'proclaimers_cards';
    }
    static get cards() {

    }

    static get proclaimers() {

    }
}

/**
 *
 * @type {ProclaimerModel}
 */
module.exports = ProclaimerCardModel;