/**
 * Author: Ismael Gorissen
 * Date: 24/04/13 13:01
 * Company: PinchProject
 *
 * Copyright (C) 2013 PinchProject
 */

var debug = require('debug')('cache');

function Cache(type, options) {
    var storage = null;

    debug('Caching type : %s', type);

    type = type || 'memory';
    type = type.toLowerCase().trim();

    if (typeof type === 'string') {
        try {
            switch (type) {
                case 'memory':
                    debug('Memory caching storage will be used');

                    var memory = require('./storages/' + type + '.js');
                    storage = new memory();
                    break;
                case 'redis':
                    debug('Redis caching storage will be used');

                    var redis = require('./storages/' + type + '.js');
                    storage = new redis(options);
                    break;
                default:
                    debug('There is no bundled caching storage named : %s', type);
            }
        } catch (ex) {
            throw new Error('There is no bundled caching storage named : ' + type + '.js');
        }
    }

    return storage;
}

module.exports = Cache;