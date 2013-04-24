/**
 * Author: Ismael Gorissen
 * Date: 24/04/13 14:54
 * Company: PinchProject
 *
 * Copyright (C) 2013 PinchProject
 */

var CacheSys = require('../lib');

var cache = new CacheSys('redis');

cache.set('key1', 'value1');
cache.set('key2', 'value2');
cache.get('key1', function (err, result) {
    if (!err) {
        console.log(result);
    } else {
        console.log(err);
    }
});
cache.get('key2', function (err, result) {
    if (!err) {
        console.log(result);
    } else {
        console.log(err);
    }
});
cache.clear(function (err) {
    if (!err) {
        console.log('cleared');
    } else {
        console.log(err);
    }
});