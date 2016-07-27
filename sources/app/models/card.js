const Model = require('../libs/orm');


class CardModel extends Model {
    static get table() {
        return 'cards';
    }
}

/**
 * @property isLost
 * @property hasIssues
 * @property isDuplicate
 *
 * @type {CardModel}
 */
module.exports = CardModel;