/**
 *
 */

if (!Array.prototype.first) {
    /**
     *
     * @returns {*}
     */
    Array.prototype.first = function () {
        return (this[0]);
    };
}

if (!Array.prototype.last) {
    /**
     *
     * @returns {*}
     */
    Array.prototype.last = function () {
        return (this[this.length - 1]);
    };
}

// Symlink
Array.prototype.contains = Array.prototype.includes;

if (!String.prototype.capitalizeFirst) {
    /**
     *
     * @returns {string}
     */
    String.prototype.capitalizeFirst = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
}

if (!String.prototype.capitalize) {
    /**
     *
     * @param lower
     * @returns {string}
     */
    String.prototype.capitalize = function (lower) {
        return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };
}

//noinspection JSUnresolvedVariable
global.requestAnimFrame = global.webkitRequestAnimationFrame;

/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
global.requestInterval = function (fn, delay) {

    let start = new Date().getTime(),
        handle = {};

    function loop() {
        let current = new Date().getTime(),
            delta = current - start;

        if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
        }

        handle.value = global.requestAnimFrame(loop);
    }

    handle.value = global.requestAnimFrame(loop);
    return handle;
};

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} handle - The callback function
 */
global.clearRequestInterval = function (handle) {
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    global.cancelAnimationFrame ? global.cancelAnimationFrame(handle.value) :
        global.webkitCancelAnimationFrame ? global.webkitCancelAnimationFrame(handle.value) :
            global.webkitCancelRequestAnimationFrame ? global.webkitCancelRequestAnimationFrame(handle.value) : handle;
};