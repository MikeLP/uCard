'use strict';

const component = require(global.ROOT_DIR + '/libs/component');

module.exports = {
    data: () => {
        return {
            panel: {
                currentState: 'default',
                items: [
                    {
                        title: 'Создать новую карточку участка',
                        class: {
                            'icon ion ion-ios-add-circle-outline': true,
                            'disabled': false
                        }
                    },
                    {
                        title: 'Сохранить изменения',
                        class: {
                            'icon ion ion-ios-checkmark-circle-outline': true,
                            'disabled': true
                        }
                    },
                    {
                        title: 'Редактировать карточку участка',
                        class: {
                            'icon ion ion-ios-create-outline': true,
                            'disabled': true
                        }
                    },
                    {
                        title: 'Изменить положение участка на карте',
                        class: {
                            'icon ion ion-ios-map-outline': true,
                            'disabled': true
                        }
                    },
                    {
                        title: 'Архивировать',
                        class: {
                            'icon ion-ios-archive-outline': true,
                            'disabled': true
                        }
                    },
                    {
                        title: 'Печатать',
                        class: {
                            'icon ion ion-ios-print-outline': true,
                            'disabled': true
                        }
                    },
                    {
                        title: 'Найти карточку на карте',
                        event: 'map:show:card',
                        class: {
                            'icon ion ion-ios-locate-outline': true,
                            'disabled': true
                        }
                    },
                    {
                        title: 'Удалить карточку участка',
                        event: 'delete:card',
                        class: {
                            'icon ion ion-ios-trash-outline': true,
                            'disabled': true
                        }
                    },
                ]
            }
        };
    },
    methods: {
        /**
         *
         * @param state
         */
        setState(state) {
            if (state === this.panel.currentState || !(['edit', 'default'].contains(state))) return;
            let self = this;
            self.panel.currentState = state;
            self.panel.items.forEach((value, index) => {
                self.panel.items[index].class.disabled = !value.class.disabled;
            });
        }
    },
    components: {
        'map-area': component('pages/cards/map'),
        list: component('pages/cards/list')
    }
};
