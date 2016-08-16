'use strict';
const EventEmitter = require(global.ROOT_DIR + '/libs/event.emitter');

module.exports = {
  props: ['panel'],
  data: () => {
    return {};
  },
  methods: {
    /**
     *
     * @param event
     */
    emitEvent(event) {
      if (event) EventEmitter.emit(event);
    }
  }
};
