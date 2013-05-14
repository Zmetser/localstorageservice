(function ( angular ) {

  'use strict';

  var TableStorageProvider = function () {

    this.$get = function () {

      var Storage = function ( tableName ) {
        this.$$tableName = tableName;
        this.$$table = getFromLocalStorage( tableName );
      };

      Storage.prototype.addItem =
      Storage.prototype.setItem = function ( itemName, data ) {
        var item;

        this.$$table[itemName] = data;

        addToLocalStorage( this.$$tableName, this.$$table );

        item = this.$$table[itemName];

        return item;
      };

      Storage.prototype.getItem = function ( itemName ) {
        var item;

        if ( !this.$$table.hasOwnProperty(itemName) ) {
          return null;
        }

        item = this.$$table[itemName];

        return item;
      };

      Storage.prototype.removeItem = function ( itemName ) {
        var item;

        if ( !this.$$table.hasOwnProperty(itemName) ) {
          return null;
        }

        item = this.$$table[itemName];

        delete this.$$table[itemName];

        addToLocalStorage( this.$$tableName, this.$$table );

        return item;
      };

      Storage.prototype.truncate = function () {
        this.$$table = {};
        removeFromLocalStorage( this.$$tableName );
        this.$$tableName = '';
      };

      var $storage = function ( tableName ) {
        return new Storage( tableName );
      };

      return $storage;

    };

  };

  angular.module('localStorageModule', [])
    .provider('$storage', TableStorageProvider);

  // localStorage helpers
  function addToLocalStorage( key, value ) {
    if ( undefined === value ) {
      return false;
    }

    value = JSON.stringify(value);
    localStorage.setItem(key, value);

    return true;
  }

  function getFromLocalStorage( key ) {
    var item = localStorage.getItem(key);

    if ( !item ) {
      return {};
    }

    item = JSON.parse(item);

    return item;
  }

  function removeFromLocalStorage( key ) {
    localStorage.removeItem(key);
  }

})( angular );
