'use strict';

const Vue = require('vue/dist/vue.js');
const component = require('./component');
const {LocalStorage} = require('./storage');

let components = {
    intro: component('intro'),
    navigation: component('navigation'),
    cards: component('pages/cards')
};

Vue.component('panel', component('pages/panel'));

let showWelcomeScreen = LocalStorage.get('welcomeScreen');


module.exports = new Vue({
    el: 'body',
    data: () => {
        return {
            currentView: 'home',
            showWelcomeScreen: showWelcomeScreen === null ? true : !!parseInt(showWelcomeScreen)
        };
    },
    components: components,
    methods: {
        hideWelcomeScreen() {
            LocalStorage.set('welcomeScreen', 0);
            //noinspection JSUnresolvedVariable
            this.showWelcomeScreen = false;
        }
    }
});
