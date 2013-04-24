/**
 * Author: Ismael Gorissen
 * Date: 24/04/13 13:29
 * Company: PinchProject
 *
 * Copyright (C) 2013 PinchProject
 */

var debug = require('debug')('cache:memory');

function Memory() {
    debug('Initialize memory cache object');

    var size = 0,
        cache = {};

    methods(cache, {
        get: function (key) {
            debug('Retrieve value for key : %s', key);

            return key in cache ? cache[key] : null;
        },
        set: function (key, value, ttl) {
            debug('Store value<%s> with key<%s> for %s ms', key, value.toString(), ttl);

            cache[key] = value;
            size += 1;

            if (ttl) {
                setTimeout(function () {
                    delete cache[key];
                    size -= 1;
                }, ttl);
            }
        },
        del: function (key) {
            debug('Remove key<%s> from cache object', key);

            if (key in cache ? cache[key] : null) {
                delete cache[key];
                size -= 1;
            }
        },
        size: function () {
            debug('Retrieve number of keys in cache object');

            return size;
        },
        clear: function () {
            debug('Reset cache object');

            cache = {};
        },
        byteLength: function () {
            debug('Retrieve bytes length of cache object');

            return Buffer.byteLength(JSON.stringify(cache));
        }
    });

    return cache;
}

function methods(obj, methodHash) {
    debug('Set all methods of cache object');

    for (var methodName in methodHash) {
        Object.defineProperty(obj, methodName, {
            value: methodHash[methodName],
            enumerable: true
        });
    }
}

module.exports = Memory;