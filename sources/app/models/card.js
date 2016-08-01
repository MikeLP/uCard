const Model = require('../libs/orm');
const ProclaimerModel = require('./proclaimer');
const ProclaimerCardModel = require('./pc');

class CardModel extends Model {
    /**
     *
     * @returns {string}
     */
    static get table() {
        return 'cards';
    }

    /**
     *
     * @returns {string[]}
     */
    static get jsonProperties() {
        return ['map', 'area', 'address'];
    }

    /**
     *
     * @returns {Promise}
     */
    get proclaimers() {
        return CardModel.hasManyThrough(ProclaimerModel, ProclaimerCardModel, 'proclaimerId')
            .where(
                ProclaimerCardModel.table + '.' + 'cardNumber',
                this.number
            )
            .sort('beginDate')
            .all();
    }

    /**
     *
     * @param properties
     */
    parseJSON(properties) {
        for (let property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (CardModel.jsonProperties.contains(property)) {
                    try {
                        this[property] = JSON.parse(properties[property]);
                    } catch (error) {
                        console.log(error);
                        this[property] = properties[property];
                    }
                } else {
                    this[property] = properties[property];
                }

            }
        }
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