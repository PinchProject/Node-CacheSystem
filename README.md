# Node-CacheSystem

![dependencies](https://david-dm.org/PinchProject/Node-CacheSystem.png)

## Install

```
[sudo] npm install node-cache-system
```

## Usage

```
/* Require the module first */
var Cache = require('node-cache-system');

/* Use in-memory */
var inMemoryCache = new Cache();

inMemoryCache.set('key','value');
console.log(inMemoryCache.get('key));
inMemoryCache.clear();


/* Use redis */
var redisCache = new Cache('redis');

redisCache.set('key','value', 2000);
redisCache.get('key', function(err, data) {
	if (!err) {
		console.log(data);
	} else {
		console.log(err);
	}
});
```

**Important** : you can use debug option when launching your code with `DEBUG=* node apps.js`, `DEBUG=cache:redis node app.js` or `DEBUG=cache:memory node app.js`

## API

#### In-memory

* `get(key)`

	Return key value from the cache

* `set(key, value, ttl)`

	Add key value in the cache with or without time to live option

* `del(key)`

	Remove a key from the cache

* `size()`

	Return the number of keys in the cache

* `clear()`

	Clear the cache entirely

* `byteLength()`

	Return bytes length of the cache


#### Redis

* `get(key, callback)`

	Return the key value from database and return in the callback an error or the key value

* `set(key, value, ttl)`

	Add key value in the database with or without time to live option

* `del(key)`

	Remove a key from database

* `size(callback)`

	Return the number of keys in the database and return in the callback an error
	if there is one

* `clear(callback)`

	Clear the database entirely and return in the callback an error or the number
	of keys that have been removed


## License

(The MIT License)

Copyright (C) 2013 PinchProject

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Change log

#### v0.1.0

* first release