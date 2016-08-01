'use strict';

const component = require(global.ROOT_DIR + '/libs/component');
const controls = require('./controls');

module.exports = {
    data: () => {
        return {
            card: null,
            proclaimers: [],
            panel: {
                currentState: 'default',
                items: controls
            }
        };
    },
    methods: {
        /**
         * @param state
         */
        setPanelState(state) {
            switch (state) {
                case state === this.panel.currentState:
                    return;
                case 'before:edit':
                    this.panel.items = this.panel.items.map((value) => {
                        value.class.disabled = !!['save', 'create'].contains(value.name);
                        return value;
                    });
                    break;
                case 'edit':
                    this.panel.items = this.panel.items.map((value) => {
                        value.class.disabled = value.name === 'create';
                        return value;
                    });
                    break;
                case 'disabled':
                    this.panel.items = this.panel.items.map((value) => {
                        value.class.disabled = true;
                        return value;
                    });
                    break;
                case 'default':
                    this.panel.items = this.panel.items.map((value) => {
                        value.class.disabled = !(value.name === 'create');
                        return value;
                    });
                    break;
            }

            this.panel.currentState = state;

        }
    },
    components: {
        'map-area': component('pages/cards/map'),
        list: component('pages/cards/list')
    }
};
