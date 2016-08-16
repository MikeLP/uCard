'use strict';
const EventEmitter = require('events');
const _ = require('lodash');

class AppEmitter extends EventEmitter {
  /**
   *
   * @param event
   */
  off (event) {
    let self = this;
    if (!_.has(this._events, event)) return;
    if (_.isArray(event)) {
      this.removeAllListeners(event);
    } else if (!event) {
      this.removeAllListeners();
    } else if (_.isString(event)) {
      let listeners = this.listeners(event);
      listeners.forEach(function (listener) {
        self.removeListener(event, listener);
      });
    }
  }
}

/**
 *
 * @type {AppEmitter}
 */
module.exports = new AppEmitter();
