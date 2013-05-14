/* globals describe, beforeEach, it, expect, module, inject */

describe('Service: tableStorage', function () {

  'use strict';

  var storage;

  beforeEach( module('localStorageModule') );

  beforeEach(inject(function ( $storage ) {
    storage = $storage;
  }));



  describe('provider', function () {

    it('should always return a new instance', function() {
      var table1 = storage('table1');
      var table2 = storage('table2');

      // internals
      expect(table1.$$tableName).toBe('table1');
      expect(table2.$$tableName).toBe('table2');
    });

  });



  describe('consistency', function () {

    it('API functions should be intact', function() {
      var table = storage('table');

      expect(table.addItem).not.toBe(undefined);
      expect(table.setItem).not.toBe(undefined);
      expect(table.getItem).not.toBe(undefined);
      expect(table.removeItem).not.toBe(undefined);
      expect(table.truncate).not.toBe(undefined);

      expect(table.wtf).toBe(undefined);

    });

  });



  describe('test different value types', function () {
    var table;

    beforeEach(function () {
      table = storage('test');
    });

    it('should store primitives', function() {
      table.setItem('number', 0);
      expect(table.getItem('number')).toBe(0);

      table.setItem('53bit', 9007199254740992);
      expect(table.getItem('53bit')).toBe(9007199254740992);

      table.setItem('string', 'string');
      expect(table.getItem('string')).toBe('string');

      table.setItem('emptystring', '');
      expect(table.getItem('emptystring')).toBe('');

      table.setItem('null', null);
      expect(table.getItem('null')).toBe(null);

      table.setItem('false', false);
      expect(table.getItem('false')).toBe(false);

      table.setItem('undefined', undefined);
      expect(table.getItem('undefined')).toBe(undefined);
    });

    it('should store objects', function() {
      var table2 = storage('test2');

      table.setItem('emtyObject', {});
      expect(table.getItem('emtyObject')).toEqual({});

      table2.setItem('object', {1:1});
      expect(table2.getItem('object')).toEqual({1:1});
    });

    it('should store array', function() {
      table.setItem('emptyArray', []);
      expect(table.getItem('emptyArray')).toEqual([]);

      table.setItem('array', [1,2]);
      expect(table.getItem('array')).toEqual([1,2]);
    });

  });



  describe('test persistent storage layer', function () {
    var datas = [
        {
          'id': 135,
          'name': 'test1',
          'buzz': 'Lorem ipsum dolor.'
        },
        {
          'id': 146,
          'name': 'test2',
          'buzz': 'Sit amet gloria mundi.'
        }
      ];

    it('should store values in the table called "persistent"', function () {
      localStorage.clear();

      var persistent = storage('persistent'),
          persistent2 = storage('persistent2');

      for ( var i = 0, len = datas.length; i < len; i++ ) {
        persistent.setItem(i, datas[i]);
        persistent2.setItem(i, datas[i]);
      }

      describe('persistent storage layer', function () {

        it('should find datas directly in localStorage', function () {
          expect(localStorage.getItem('persistent')).not.toBe(null);
          expect(localStorage.getItem('persistent2')).not.toBe(null);
        });

        it('should retrive first object from "persistent" table', function () {
          expect(persistent.getItem(1)).toEqual(datas[1]);
          expect(persistent2.getItem(1)).toEqual(datas[1]);
        });

        it('should set and remove from two tables', function () {
          expect(persistent.removeItem(1)).toEqual(datas[1]);
          expect(persistent.getItem(1)).toEqual(null);
          expect(persistent.getItem(0)).toEqual(datas[0]);

          expect(persistent.setItem(100, 1)).toEqual(1);
          expect(persistent.removeItem(100)).toEqual(1);
          expect(persistent.getItem(100)).toEqual(null);

          expect(persistent2.setItem(100, 2)).toEqual(2);
          expect(persistent2.removeItem(100)).toEqual(2);
          expect(persistent2.getItem(100)).toEqual(null);
        });

        it('should destroy truncate', function () {
          persistent.truncate();
          expect(persistent.getItem(0)).toEqual(null);
          expect(persistent2.getItem(0)).toEqual(datas[0]);
          persistent2.truncate();
          expect(persistent2.getItem(0)).toEqual(null);
        });

        it('should set and remove from two tables after truncate', function () {
          expect(persistent.setItem(100, 1)).toEqual(1);
          expect(persistent.removeItem(100)).toEqual(1);
          expect(persistent.getItem(100)).toEqual(null);

          expect(persistent2.setItem(100, 2)).toEqual(2);
          expect(persistent2.removeItem(100)).toEqual(2);
          expect(persistent2.getItem(100)).toEqual(null);
        });

      });

    });

  });

});
