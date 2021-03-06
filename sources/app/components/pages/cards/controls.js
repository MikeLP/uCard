module.exports = [
    // {
    //     title: 'Создать новую карточку участка',
    //     name: 'create',
    //     class: {
    //         'icon ion ion-ios-add-circle-outline': true,
    //         'disabled': false
    //     }
    // },
    {
        title: 'Сохранить изменения',
        name: 'save',
        class: {
            'icon ion ion-ios-checkmark-circle-outline': true,
            'disabled': true
        }
    },
    {
        title: 'Редактировать карточку участка',
        name: 'edit',
        class: {
            'icon ion ion-ios-create-outline': true,
            'disabled': true
        }
    },
    {
        title: 'Изменить положение участка на карте',
        name: 'map',
        event: 'edit:map',
        class: {
            'icon ion ion-ios-map-outline': true,
            'disabled': true,
        }
    },
    {
        title: 'Архивировать',
        name: 'archive',
        class: {
            'icon ion-ios-archive-outline': true,
            'disabled': true
        }
    },
    {
        title: 'Печатать',
        name: 'print',
        class: {
            'icon ion ion-ios-print-outline': true,
            'disabled': true
        }
    },
    {
        title: 'Найти карточку на карте',
        name: 'locate',
        event: 'map:show:card',
        class: {
            'icon ion ion-ios-locate-outline': true,
            'disabled': true
        }
    },
    {
        title: 'Удалить карточку участка',
        name: 'delete',
        event: 'delete:card',
        class: {
            'icon ion ion-ios-trash-outline': true,
            'disabled': true
        }
    },
];
