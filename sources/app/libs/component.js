'use strict';
const Vue = require('vue/dist/vue.js');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

/**
 *
 * @param name
 * @returns {VueStatic}
 */
module.exports = (name) => {
    if (_.isString(name)) {
        let component = require('../components/' + name + '/main.js');

        let style = global.window.document.createElement('link');
        style.setAttribute('href', 'components/' + name + '/style.css');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('media', 'screen');
        global.window.document.head.appendChild(style);

        component.template = fs
            .readFileSync(path.resolve(__dirname, '../components/' + name + '/template.vue'), 'utf-8')
            .replace(/>\s+</g, '><');

        //noinspection JSValidateTypes

        return Vue.extend(component);
    }
    throw new Error('Component name is not defined');
};

