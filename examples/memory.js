/**
 * Author: Ismael Gorissen
 * Date: 24/04/13 13:24
 * Company: PinchProject
 *
 * Copyright (C) 2013 PinchProject
 */

var CacheSys = require('../lib');

var cache = new CacheSys();

cache.set('key1', 'value1');
console.log(cache.get('key1'));
console.log(cache.size());
console.log(cache.byteLength());

cache.set('key2', 'value2');
console.log(cache.get('key2'));
console.log(cache.size());
console.log(cache.byteLength());

cache.clear();

console.log(cache.get('key1'));
console.log(cache.get('key2'));
console.log(cache.size());
console.log(cache.byteLength());