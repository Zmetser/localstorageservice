# 0.2.0 (2013.05.14)

API is simpified, now the provider does the heavy work of table init.
The new syntax to get a table is $storage('tableName')

## Features

* Get the current working table with ```$$table`` to work with the data set.
* Internal array and object storage mode.

## Breaking Changes

* Service name changed to $storage.
* ```release```, ```getTable``` and ```isSupported``` methods are no longer accessible.