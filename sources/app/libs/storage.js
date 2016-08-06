'use strict';

let property = Symbol();

class Storage {
    /**
     *
     * @param storage
     */
    constructor(storage) {
        this[property] = '_storage';
        this._storage = !storage ? {} : storage;
    }

    /**
     *
     * @param key
     * @returns {null}
     */
    get(key) {
        return this._storage.hasOwnProperty(key) ? this._storage[key] : null;
    }

    /**
     *
     * @param key
     * @param value
     */
    set(key, value) {
        this._storage[key] = JSON.stringify(value);
    }
}

class LocalStorage extends Storage {
    /**
     *
     */
    constructor() {
        super(global.window.localStorage);
    }

    /**
     *
     * @param key
     * @returns {null}
     */
    get(key) {
        try {
            return JSON.parse(this._storage.getItem(key));
        } catch (error) {
            // console.error(error);
            return null;
        }
    }

    /**
     *
     * @param key
     * @param value
     */
    set(key, value) {
        this._storage.setItem(key, JSON.stringify(value));
    }
}

class SessionStorage extends Storage {
    constructor() {
        super(global.window.sessionStorage);
    }

    /**
     *
     * @param key
     * @returns {null}
     */
    get(key) {
        try {
            return JSON.parse(this._storage.getItem(key));
        } catch (error) {
            // console.error(error);
            return null;
        }
    }

    /**
     *
     * @param key
     * @param value
     */
    set(key, value) {
        this._storage.setItem(key, JSON.stringify(value));
    }
}

module.exports = {
    Storage: Storage,
    LocalStorage: new LocalStorage,
    SessionStorage: new SessionStorage,
};
