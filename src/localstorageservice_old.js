(function ( angular ) {

  'use strict';

  angular.module('localStorageModule', [])
    .factory('localStorageService', function () {
      var tables = {},
        db = {};

      var localStorageSupported = !!window.localStorage;

      var addToLocalStorage = function ( key, value ) {
        if ( undefined === value ) {
          return false;
        }

        value = JSON.stringify(value);
        localStorage.setItem(key, value);

        return true;
      };

      var getFromLocalStorage = function ( key ) {
        var item = localStorage.getItem(key);

        if ( !item ) {
          return {};
        }

        item = JSON.parse(item);

        return item;
      };

      var removeFromLocalStorage = function ( key ) {
        localStorage.removeItem(key);
      };

      var tableExists = function ( tableName ) {
        return db.hasOwnProperty(tableName);
      };

      function Storage( workingTableName ) {
        if ( !workingTableName || !workingTableName ) {
          throw new Error('No table name specified');
        }

        return this._getTable(workingTableName);
      }

      Storage.prototype.addItem =
      Storage.prototype.setItem = function ( itemName, data ) {
        this._workingTable[itemName] = data;

        addToLocalStorage( this._workingTableName, this._workingTable );

        return this._workingTable[itemName];
      };

      Storage.prototype.getItem = function ( itemName ) {

        if ( !this._workingTable.hasOwnProperty(itemName) ) {
          return null;
        }

        return this._workingTable[itemName];
      };

      Storage.prototype.removeItem = function ( itemName ) {
        var item;

        if ( !this._workingTable.hasOwnProperty(itemName) ) {
          return null;
        }

        item = this._workingTable[itemName];

        delete this._workingTable[itemName];

        addToLocalStorage( this._workingTableName, this._workingTable );

        return item;
      };

      Storage.prototype.truncate = function () {
        this._workingTable = {};
        delete db[this._workingTableName];
        removeFromLocalStorage( this._workingTableName );
      };

      Storage.prototype._getTable = function ( tableName ) {

        this._workingTableName = tableName;

        if ( !tableExists(tableName) ) {
          db[tableName] = getFromLocalStorage(tableName);
        }

        this._workingTable = db[tableName];

        return this;
      };

      return {
        isSupported: localStorageSupported,

        release: function ( tableName ) {
          tableName = angular.isString(tableName) ? tableName : tableName._workingTableName;

          if ( !tables.hasOwnProperty(tableName) ) {
            throw new Error('No table found with the name: ', tableName);
          }

          delete tables[tableName];

          return {};
        },

        getTable: function ( tableName ) {
          if ( !tables.hasOwnProperty(tableName) ) {
            tables[tableName] = new Storage( tableName );
          }

          return tables[tableName];
        }
      };
    }
  );

})( angular );
