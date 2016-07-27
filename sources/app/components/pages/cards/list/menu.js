/**
 *
 * @type {{separator: {type: string}, edit: {label: string}, save: {label: string, enabled: boolean}, archive: {label: string}, remove: {label: string}, properties: {label: string, selector: string, submenu: *[]}}}
 */
module.exports = {
    separator: {
        type: 'separator'
    },
    edit: {
        label: 'Редактировать',
    },
    save: {
        label: 'Сохранить',
        enabled: false,
    },
    archive: {
        label: 'Архивировать',
    },
    remove: {
        label: 'Удалить',
    },
    properties: {
        label: 'Свойства',
        selector: 'prop',
        submenu: [
            {
                label: 'Потерян',
                type: 'checkbox',
                value: 'isLost',
                checked: false,
            },
            {
                label: 'Проблемный',
                type: 'checkbox',
                value: 'hasIssues',
                checked: false
            },
            {
                label: 'Дубликат',
                type: 'checkbox',
                value: 'isDuplicate',
                checked: false
            },
            {
                type: 'separator'
            },
            {
                label: 'Сбросить все',
                value: 'reset'
            }
        ]
    }
};