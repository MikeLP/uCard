'use strict';

let l = require('leaflet'),
  property = Symbol(),
  _ = require('lodash');
require('leaflet-draw');

class Map {
  /**
   *
   * @param options
   */
  constructor(options) {
    this.options = Object.assign({
      provider: 'osm',
      retina: l.Browser.retina ? '@2x' : ''
    }, options);

    this.map = l.map(options.el || 'map', {
      center: [46.475794, 30.717397],
      zoom: 15,
      zoomControl: false,
      maxZoom: options.maxZoom || 18,
      reuseTiles: true,
      unloadInvisibleTiles: true
    });

    this.map.doubleClickZoom.disable();

    this.subdomains = {
      'osm': ['a', 'b', 'c'],
      'osm-long': ['a', 'b', 'c'],
      'osm-light': ['a', 'b', 'c'],
      'mapbox': ['a', 'b', 'c', 'd'],
      'mapbox-light': ['a', 'b', 'c', 'd'],
      '2gisRU': [1, 2, 3],
      '2gis': [1, 2, 3]
    };

    this[property] = 'tilesProviders';
    this[property] = 'TileLayerCached';

    this.layer = null;

    this.tilesProveiders = {
      'osm': 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      'osm-light': 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}' + this.options.retina + '.png',
      'wmflabs': 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',

      'mapbox': 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=' +
        'pk.eyJ1IjoiaXlhbmVsbG8iLCJhIjoiY2lxcXdpNnRiMDA3aGh3bmtpNjJpNzc0dSJ9.gET5ffIsRbfiC-xnWH0C2g',
      'mapbox-light': 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=' +
        'pk.eyJ1IjoiaXlhbmVsbG8iLCJhIjoiY2lxcXdpNnRiMDA3aGh3bmtpNjJpNzc0dSJ9.gET5ffIsRbfiC-xnWH0C2g',

      /* 2gis try random tile like tile% */
      '2gisRu': 'http://tile{s}.maps.2gis.ru/tiles?x={x}&y={y}&z={z}&v=1112' + this.options.retina,
      '2gis': 'https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1' + this.options.retina
    };
  }

  /**
   *
   * @param position
   * @param zoom
   * @returns {Map}
   */
  panAndZoom(position, zoom) {
    this.map.setView(position, zoom, {
      animate: true
    });
    return this;
  }

  /**
   *
   * @param points
   * @type array
   * @returns {Map}
   */
  panTo(points) {
    if (points)
      this.map.panTo(points);
    else
      throw ('Can`t pan. Please set points');
    return this;
  }

  /**
   * Display map
   * @returns {Map}
   */
  show() {
    let provider = this.tilesProveiders[this.options.provider] || ['a', 'b', 'c'];

    let tileLayer = l.tileLayer(provider, {
      attribution: '',
      subdomains: this.subdomains[this.options.provider]
    });

    tileLayer.addTo(this.map);
    
    return this;
  }

  /**
   *
   * @returns {Map}
   */
  clearLayers() {
    if (this.layer) {
      this.map.removeLayer(this.layer);
    }
    return this;
  }

  /**
   *
   * @returns {Map}
   */
  refresh() {
    this.map.invalidateSize();
    return this;
  }

  /**
   *
   * @param zoom
   * @returns {Map}
   */
  setZoom(zoom) {
    zoom = parseFloat(zoom);
    this.map.setZoom(zoom);
    return this;
  }

  /**
   *
   * @param area
   */
  drawShape(area) {
    this.clearLayers();

    if (_.isObject(area) && ['polyline', 'polygon'].contains(area.type)) {
      this.layer = l[area.type](area.position, {
        color: this.options.shape.color || 'red',
        weight: this.options.shape.weight || 5
      }).addTo(this.map);
    }

    return this;
  }

  addDrawControls() {
    this.clearLayers();
    // Initialise the FeatureGroup to store editable layers
    let drawnItems = new l.FeatureGroup();
    this.map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    new l.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    });
    return this;
  // this.map.addControl(drawControl)
  // this.map.removeControl(drawControl)
  }

  /**
   *
   * @returns {*}
   */
  get() {
    return this.map;
  }

  /**
   * Reset all events and remove map from DOM.
   * @returns {*}
   */
  destroy() {
    return this.map.remove();
  }
}

/**
 *
 * @type {Map}
 */
module.exports = Map;

// cacheMapTile = l.TileLayer.extend({
//    _imageToDataUri: function (image) {
//        let canvas = window.document.createElement('canvas')
//        canvas.width = image.width
//        canvas.height = image.height
//
//        let context = canvas.getContext('2d')
//        context.drawImage(image, 0, 0)
//        console.log(context)
//        return canvas.toDataURL('image/png')
//    },
//
//    _tileOnLoadWithCache: function () {
//        let self = this
//        let path = this._layer.options.cache_path + this._data.file_name + '.png'
//        fs.exists(path, function (exists) {
//            if (!exists) {
//                core.log('write file ' + path)
//                let base64Image = self._layer._imageToDataUri(self).replace(/^data:image\/\w+;base64,/, "")
//                let decodedImage = new Buffer(base64Image, 'base64')
//                //console.log(decodedImage)
//                fs.writeFile(path, decodedImage, function (err) {
//                })
//            }
//        })
//        l.TileLayer.prototype._tileOnLoad.apply(this, arguments)
//    },
//
//    _setUpTile: function (tile, data, value, cache) {
//        tile._layer = this
//        if (cache) {
//            tile._data = data
//            tile.onload = this._tileOnLoadWithCache
//            tile.crossOrigin = 'Anonymous'
//        } else {
//            tile.onload = this._tileOnLoad
//        }
//        tile.onerror = this._tileOnError
//        try {
//            tile.src = value
//        }
//        catch (e) {
//            core.log(e)
//        }
//
//    },
//
//    _loadTile: function (tile, tilePoint) {
//        this._adjustTilePoint(tilePoint)
//        let data = {
//            file_name: tilePoint.z + '_' + tilePoint.y + '_' + tilePoint.x
//        }
//
//        let self = this
//        let path = this.options.cache_path + data.file_name + '.png'
//
//        if (this.options.cache) {
//            fs.exists(path, function (exists) {
//                if (exists) {
//                    self._setUpTile(tile, data, path, false)
//                    //core.log('read from cache')
//                } else {
//                    //core.log('read from net')
//                    self._setUpTile(tile, data, self.getTileUrl(tilePoint), true)
//                }
//            })
//        } else
//            self._setUpTile(tile, data, self.getTileUrl(tilePoint), false)
//    }
// })
