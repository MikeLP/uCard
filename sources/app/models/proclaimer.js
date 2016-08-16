const Model = require('../libs/orm');

class ProclaimerModel extends Model {
  static get properties () {
    return [
      'id',
      'name',
      'surname',
      'age',
      'status',
      'isPioneer',
      'gender',
      'description',
      'address',
      'location',
      'phone',
      'isHidden',
      'unreliable',
      'createdAt',
      'updatedAt',
      'groupId'
    ];
  }

  static get table () {
    return 'proclaimers';
  }

  get fullName () {
    return this.name + ' ' + this.surname;
  }

  get cards () {}
}

/**
 *
 * @type {ProclaimerModel}
 */
module.exports = ProclaimerModel;
