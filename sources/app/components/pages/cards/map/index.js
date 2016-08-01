'use strict';
const EventEmitter = require(global.ROOT_DIR + '/libs/event.emitter');
const Map = require(global.ROOT_DIR + '/libs/map');

let currentCard = null;
let map = null;
let isRefreshed = false;

module.exports = {
    /**
     *
     */
    created() {
        EventEmitter.off('map:show:card');
        isRefreshed = false;
        if (map) {
            map.destroy();
        }
    },

    /**
     *
     */
    mounted() {
        // console.log('Mounted');
        EventEmitter.on('map:show:card', this.showCardOnTheMap.bind(this));
        map = new Map(this.config);
    },

    activated() {
        map.show();
    },

    /**
     *
     * @returns {{config: {cache: boolean, provider: string, shape: {color: string, weight: number}}}}
     */
    data: () => {
        return {
            config: {
                cache: true,
                provider: '2gis',
                zoom: 16,
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

    /**
     *
     */
    methods: {
        /**
         *
         * @param card
         */
        showCardOnTheMap(card) {
            let zoom = parseInt(this.config.zoom) || 16;
            if (card) currentCard = card;

            if (currentCard) {
                // Костыль для leaflet. leaflet глючит при ресайзе.
                if (!isRefreshed) {
                    isRefreshed = true;
                    setTimeout(()=> {
                        map.refresh();
                    }, 150)
                }
                map
                    .panAndZoom(currentCard.map, zoom)
                    .drawShape(currentCard.area);
            } else {
                throw new Error('Please select card');
            }
        }
    }
};