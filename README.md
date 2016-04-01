# `list-promise`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

Maximally-concurrent Promise-aware array iteration.

## Install

    $ npm install --save list-promise

## Usage

```js
import list from 'list-promise';
import fs from 'fs-promise';

// Manipulate a given array
list(['src/foo.js', 'src/bar.js'])
    .map(path => fs.readFile(path, 'utf8'))
    .map(file => file.split('').reverse().join(''))
    .reduce((bundle, file) => bundle + file, '')
    .then(bundle => fs.writeFile('bundle.js', bundle));

// Or, pre-build the array iteration pipeline
const bundler = list()
    .map(path => fs.readFile(path, 'utf8'))
    .map(file => file.split('').reverse().join(''))
    .reduce((bundle, file) => bundle + file, '')

// To resolve later
bundler
    .resolve(['src/foo.js', 'src/bar.js'])
    .then(bundle => fs.writeFile('bundle.js', bundle));
```

## API

### listPromise(list) : ListPromise

- `list` `Array|Promise<Array>` A list of items which may or may not be Promises.

Creates a promise with `map`, `reduce`, and `filter` methods that can be used to iterate over list items as they are resolved.

### ListPromise

#### .map(fn): ListPromise

- `fn` `Function(item, i, items) : item` Map callback.

Creates a new `ListPromise` for the results of mapping a list with a given map function.

#### .filter(fn): ListPromise

- `fn` `Function(item, i, items) : context` Filter callback.

Creates a new `ListPromise` for the results of filtering a list with a given filter function.

#### .reduce(fn, [initialValue]): ListPromise

- `fn` `Function(context, item, i, items) : context` Reduce callback.
- `initialValue` `*` (default: `undefined`) Initial value to pass to the reducer.

Creates a new `ListPromise` for the result of reducing a list with a given reducer function. If the reduction results in an array, that array may then be iterated.

#### .resolve(list): ListPromise

- `list` `Array|Promise<Array>` A list of items which may or may not be Promises.

List manipulations happen using an internal pipeline. These pipelines may be pre-built and applied to lists later.

**Note:** Initial values given to `.reduce()` will be shared between every call to `.resolve()`. If the initial value is an object or array, this could have undesired effects. You'll likely want to clone the initial value in the reduce function.

## Contribute

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

    $ npm test

----

© Shannon Moeller <me@shannonmoeller.com> (http://shannonmoeller.com)

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/list-promise/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/list-promise
[downloads-img]: http://img.shields.io/npm/dm/list-promise.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/list-promise.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/list-promise
[travis-img]:    http://img.shields.io/travis/shannonmoeller/list-promise.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/list-promise
