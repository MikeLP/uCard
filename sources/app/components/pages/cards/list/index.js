'use strict';

const EventEmitter = require(global.ROOT_DIR + '/libs/event.emitter');
const CardsModel = require(global.ROOT_DIR + '/models/card');
const MenuElements = require('./menu');
const _ = require('lodash');

//noinspection NpmUsedModulesInstalled
const {remote} = require('electron');
const {Menu, MenuItem, dialog} = remote;

const menu = new Menu;
const streets = require('./streets');


let previousSearchQuery = String();

module.exports = {
    created() {
        this.destroy();
        // List for auto-complete hardcoded
        //noinspection JSUnresolvedVariable
        this.streets = streets.Ukraine.Odessa;

        // Disallow edit card
        this.$parent.setPanelState('default');

        EventEmitter.on('delete:card', this.remove.bind(this));
        EventEmitter.on('edit:map', this.editMap.bind(this));

        CardsModel.sort('number').all().then(this.updateList);

        this.prepareMenu();
    },

    beforeDestroy() {
        this.destroy();
    },

    data: () => {
        return {
            streets: [],
            searchQuery: '',
            activeIndex: null,
            items: []
        };
    },
    methods: {
        prepareMenu() {
            MenuElements.edit.click = this.edit;
            MenuElements.remove.click = this.remove;

            menu.append(new MenuItem(MenuElements.edit), 'Edit');
            menu.append(new MenuItem(MenuElements.save), 'Save');
            menu.append(new MenuItem(MenuElements.separator), 'separator');

            // Add click callback to submenu items
            MenuElements.properties.submenu.forEach((item, key) => {
                if (['isDuplicate', 'hasIssues', 'isLost', 'reset'].contains(item.value)) {
                    item.click = this.toggleProperty.bind(this, item.value);
                    MenuElements.properties.submenu[key] = item;
                }
            });

            menu.append(new MenuItem(MenuElements.properties), 'Properties');
            menu.append(new MenuItem(MenuElements.separator), 'separator');
            menu.append(new MenuItem(MenuElements.archive), 'Archive');
            menu.append(new MenuItem(MenuElements.separator), 'separator');
            menu.append(new MenuItem(MenuElements.remove), 'Удалить');
        },

        /**
         *
         * @param items
         */
        updateList(items) {
            if (_.isArray(items)) {
                this.items = items;
            } else if (items instanceof CardsModel) {
                this.items = [items];
            } else {
                this.items = [];
            }
        },

        /**
         *
         */
        destroy() {
            menu.clear();
            menu.removeAllListeners();
            EventEmitter.off('delete:card');
            EventEmitter.off('edit:map');
        },

        /**
         *
         */
        clearSearch() {
            this.searchQuery = '';
        },

        /**
         *
         */
        search() {
            let self = this;
            let query = this.searchQuery.trim();
            if (query !== previousSearchQuery) {
                if (_.isEmpty(query)) {
                    CardsModel.sort('number').all().then(this.updateList);
                } else {
                    if (parseInt(query) > 0) {
                        CardsModel
                            .where('number', query)
                            .first()
                            .then(this.updateList);
                    } else {
                        CardsModel
                            .where('number', query)
                            .orWhere('name', 'like', '%' + query + '%')
                            .orWhere('address', 'like', '%' + query + '%')
                            .sort('number')
                            .all()
                            .then(this.updateList);
                    }

                }
                previousSearchQuery = query;
                self.$parent.setPanelState('default');
            }
        },

        remove() {
            let buttons = ['Удалить', 'Отмена'];
            let card = this.items[this.activeIndex];

            if (_.isObject(card)) {
                //noinspection JSUnresolvedFunction
                dialog.showMessageBox({
                    type: 'warning',
                    buttons: buttons,
                    title: 'Удаление участка',
                    message: 'Подтвердите удаление участка №' + card.number,
                    // cancelId: 1,
                    detail: 'Вы действительно хотите удалить карточку?\nВНИМАНИЕ! Удаление НЕОБРАТИМО! Это ' +
                    'значит, что вы не сможете посмотреть статистику и историю выдачи этого участка.'
                }, function (buttonIndex) {
                    console.log(buttonIndex);
                });
            } else {
                throw new Error('Please select card');
            }
        },
        /**
         *
         * @param property
         */
        toggleProperty(property) {
            let card = this.items[this.activeIndex];
            if (property === 'reset') {
                card.isDuplicate = false;
                card.hasIssues = false;
                card.isLost = false;
            } else {
                card[property] = !card[property];
            }
        },

        edit() {
            console.log(this.activeIndex);
        },

        editMap() {
            console.log('Edit MAp');
        },

        /**
         *
         * @param event
         * @param index
         */
        select(event, index) {
            event.preventDefault();
            if (this.activeIndex == index) return;
            this.activeIndex = index;
            let card = this.items[index];
            card.proclaimers.then(proclaimers => {
                this.$parent.proclaimers = proclaimers;
            });
            this.$parent.card = card;
            this.$parent.setPanelState('before:edit');

            EventEmitter.emit('map:show:card', card);
        },

        /**
         * @param event
         * @param index
         */
        showContextMenu(event, index) {
            this.activeIndex = index;
            let card = this.items[index];

            //noinspection JSUnresolvedVariable
            let submenu = menu.items.find((item)=> {
                return item.selector === 'prop';
            }).submenu.items;

            submenu[0].checked = !!card.isLost;
            submenu[1].checked = !!card.hasIssues;
            submenu[2].checked = !!card.isDuplicate;


            event.preventDefault();

            //noinspection JSUnresolvedFunction
            menu.popup(remote.getCurrentWindow());
        }
    }
};
