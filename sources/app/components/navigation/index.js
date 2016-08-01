module.exports = {
    data: () => {
        return {
            activeItemIndex: null,
            items: [
                {
                    label: 'Участки',
                    page: 'cards',
                    id: 1
                },
                {
                    label: 'Возвещатели',
                    page: 'publishers',
                    id: 2
                },
                {
                    label: 'Группы',
                    page: 'groups',
                    id: 3
                },
                {
                    label: 'Управление',
                    page: 'management',
                    id: 4
                },
                {
                    label: 'Статистика',
                    page: 'statistic',
                    id: 5
                },
                {
                    label: 'Настройки',
                    page: 'settings',
                    id: 6
                },
            ]
        };
    },
    methods: {
        /**
         *
         * @param index
         */
        page: function (index) {
            this.activeItemIndex = index;

            //noinspection JSUnresolvedVariable
            this.$root.currentView = this.items[index].page;
        }
    }
};