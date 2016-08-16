const Model = require('../libs/orm');
const moment = require('moment');

moment.locale('ru');

class ProclaimerCardModel extends Model {
  static get table () {
    return 'proclaimers_cards';
  }

  get dateFrom () {
    return this.beginDate * 1000;
  }

  set dateFrom (date) {
    this.beginDate = date;
  }

  get dateTo () {
    return this.endDate * 1000;
  }

  set dateTo (date) {
    this.endDate = date;
  }

  static get properties () {
    return [
      'id',
      'beginDate',
      'endDate',
      'qualitatively',
      'cardId',
      'cardNumber',
      'proclaimerId',
      'isCompany',
      'createdAt',
      'updatedAt'
    ];
  }

  get period () {
    // return this.endDate - this.beginDate
    if (parseInt(this.endDate) > 0) {
      let dateFrom = moment(parseInt(this.dateFrom));
      let dateTo = moment(parseInt(this.dateTo));
      return moment.duration(dateTo.diff(dateFrom)).humanize();
    }
    return false;
  }

  get date () {
    return [
      moment(parseInt(this.dateFrom)).format('Do MMMM YYYY'),
      moment(parseInt(this.dateTo)).format('Do MMMM YYYY')
    ];
  }

  static get cards () {}

  static get proclaimers () {}
}

/**
 *
 * @type {ProclaimerModel}
 */
module.exports = ProclaimerCardModel;
