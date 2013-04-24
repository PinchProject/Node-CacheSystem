/**
 * Author: Ismael Gorissen
 * Date: 24/04/13 13:29
 * Company: PinchProject
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

function get(key, done) {
    debug('Retrieve value for key : %s', key);

    this.client.get(key, function (err, result) {
        done(err, JSON.parse(result));
    });
}

function set(key, value, ttl) {
    debug('Store value<%s> with key<%s> for %s ms', key, value.toString(), ttl);

    if (ttl) {
        this.client.setex(key, Math.ceil(ttl), JSON.stringify(value));
    } else {
        this.client.set(key, JSON.stringify(value));
    }
}

function del(key) {
    debug('Remove key<%s> from redis database', key);

    this.client.del(key);
}

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

function clear(done) {
    debug('Reset redis database');

    var self = this;

    this.client.keys('*', function (err, keys) {
        if (!err) {
            if (keys.length > 0) {
                self.client.del(keys, function (err, result) {
                    if (!err) {
                        done();
                    } else {
                        done(err);
                    }
                });
            } else {
                done();
            }
        } else {
            done(err);
        }
    });
}

module.exports = Redis;