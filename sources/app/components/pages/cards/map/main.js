'use strict';
const EventEmitter = require(global.ROOT_DIR + '/libs/event.emitter');
const Map = require(global.ROOT_DIR + '/libs/map');

let currentCard = null;
let map = null;

module.exports = {
    created() {
        EventEmitter.off('map:show:card');
        if (map) {
            map.destroy();
            map = null;
        }
    },
    mounted() {
        EventEmitter.on('map:show:card', this.showCardOnTheMap.bind(this));
        map = new Map(this.config);
        map.show();
    },
    data: () => {
        return {
            config: {
                cache: true,
                provider: '2gis',
                // provider: 'osm-light',
                // provider: 'mapbox',
                // provider: 'osm',
                shape: {
                    color: 'rgba(214, 0, 0, 0.74)',
                    weight: 6
                }
            }
        };
    },
    methods: {
        /**
         *
         * @param card
         */
        showCardOnTheMap(card) {
            if (card) currentCard = card;
            if (currentCard) {
                map
                    .panAndZoom(currentCard.map, 16)
                    .drawShape(currentCard.area);
            } else {
                throw new Error('Please select card');
            }
        }
    }
};