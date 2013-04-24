/**
 * Author: Ismael Gorissen
 * Date: 24/04/13 13:29
 * Company: PinchProject
 *
 * Copyright (C) 2013 PinchProject
 */

var debug = require('debug')('cache:redis');

function Redis(options) {
    debug('Initialize redis database');

    options = options || {
        host: '127.0.0.1',
        port: 6379
    };

    this.client = require('redis').createClient(options.port, options.host, options);
}

Redis.prototype = {
    get: get,
    set: set,
    del: del,
    size: size,
    clear: clear
};

/**
 * Return the key value from database and return in the callback an error or the key value
 *
 * @param key
 * @param done
 */
function get(key, done) {
    debug('Retrieve value for key : %s', key);

    this.client.get(key, function (err, result) {
        done(err, JSON.parse(result));
    });
}

/**
 * Add key value in the database with or without time to live option
 *
 * @param key
 * @param value
 * @param ttl
 */
function set(key, value, ttl) {
    debug('Store value<%s> with key<%s> for %s ms', key, value.toString(), ttl);

    if (ttl) {
        this.client.setex(key, Math.ceil(ttl), JSON.stringify(value));
    } else {
        this.client.set(key, JSON.stringify(value));
    }
}

/**
 * Remove a key from database
 *
 * @param key
 */
function del(key) {
    debug('Remove key<%s> from redis database', key);

    this.client.del(key);
}

/**
 * Return the number of keys in the database and return in the callback an error if there is one
 *
 * @param done
 */
function size(done) {
    debug('Retrieve number of keys in redis database');

    this.client.dbsize(function (err, result) {
        if (!err) {
            done(null, result);
        } else {
            done(err);
        }
    });
}

/**
 * Clear the database entirely and return in the callback an error or the number
 * of keys that have been removed.
 *
 * @param done
 */
function clear(done) {
    debug('Reset redis database');

    var self = this;

    this.client.keys('*', function (err, keys) {
        if (!err) {
            if (keys.length > 0) {
                self.client.del(keys, function (err, result) {
                    if (!err) {
                        done(null, result);
                    } else {
                        done(err);
                    }
                });
            } else {
                done(null, 0);
            }
        } else {
            done(err);
        }
    });
}

module.exports = Redis;