# localStorage Service for angular.js

An [angular.js] module that gives you a table based [localStorage] API.



## Dependencies

Only requires [angular.js] ~1.2.1

## Installation

Package available from [bower]:

`bower install angular-localStorageService --save`


## Usage

### Inject service to your controller

```javascript
// inject module
angular.module('yourModule', ['localStorageModule'])

  .controller('yourController', [
    '$scope',
    '$storage', // inject service
    function($scope, $storage) {
      var table = $storage('tableName');

      table.setItem('meaningOfLife', 42);
      table.getItem('meaningOfLife'); // 42
    }
  ]);
```


---


### API

- **setItem**

Adds a new item to the table.

Returns the passed data.

If an itemID has not been set, the underlaying storage type'll be an array. Otherwise it's an object.

```
table.setItem([itemID], data);
```

- **addItem**

Alias for **setItem**


- **getItem**

Get item by name or by index if its an array.

Returns the item from storage or ```null``` if nothing found.

```
table.getItem(itemID);
```


- **removeItem**

Remove item by name or by index if its an array.

Returns the removed item or ```null``` if no item found.

```
table.removeItem(itemID);
```


- **truncate**

Dispose all datas from the current table.

```
table.truncate();
```


---


#### Example

```javascript
// Object storage
var table = $storage('tableName');

// Set items
table.setItem('meaningOfLife', 42);
table.setItem('justMyBirthday', [1989, 5, 4]);

// Get items
expect(table.getItem('meaningOfLife')).toBe(42);
expect(table.getItem('justMyBirthday')).toEqual([1989, 5, 4]);

// Remove items
var _meaningOfLife = table.removeItem('meaningOfLife');

expect(_meaningOfLife).toBe(42);
expect(table.getItem('meaningOfLife')).toBe(null);

table.removeItem('justMyBirthday');
expect(table.getItem('justMyBirthday')).toBe(null);
```

```javascript
// Array storage
var items = $storage('items');

// To use the array storage, just don't set an itemName.
items.setItem(100);
items.setItem(200);
items.setItem(300);

expect(items.$$table).toEqual([100, 200, 300]);

expect(items.getItem(0)).toEqual(100);
expect(items.getItem(4)).toBe(null);

```

#### Use with [underscore.js]

You can grab the whole table set with the ```$$table``` internal.

```javascript

var users = $storage('users');

// In this case users.$$table is an array.
users.setItem({name: "John", email: "john@gmail.com"});
users.setItem({name: "Peter", email: "peter@gmail.com"});
users.setItem({name: "Oliver", email: "oliver@gmail.com"});

...

_.findWhere(users.$$table, {name: "Oliver"})
// => {name: "Oliver", email: "oliver@gmail.com"}

```

---


### Other dependencies

- [bower] to get angular and angular.mocks
- [karma] to run tests

**Get angular and angular-mocks.**

```bower install```

**Run tests**

```karma start karma.conf.js```


---


## Browser support

Since this is not a [localStorage] polyfill, it supports the browsers [localStorage] supports.

| Feature      | Chrome | Firefox (Gecko) | Internet Explorer | Opera | Safari (WebKit) |
| ------------ |:------:|:---------------:|:-----------------:|:-----:|:---------------:|
| localStorage | 4      | 3.5             | 8                 | 10.50 | 4               |


---


## License

Copyright 2013 Oliver Kovacs

Licensed under the MIT License


[angular.js]: http://angularjs.org/  "HTML enhanced for web apps!"
[bower]: http://bower.io/  "A package manager for the web"
[karma]: http://karma-runner.github.io/  "Spectacular Test Runner for JavaScript"
[localStorage]: https://developer.mozilla.org/en-US/docs/DOM/Storage#localStorage
[underscore.js]: http://underscorejs.org/
