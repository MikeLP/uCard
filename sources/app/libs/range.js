'use strict';

function* range(start, stop) {
    let i = start;
    for (i; i <= stop; i++) {
        yield i;
    }
}

module.exports = range;
