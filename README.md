# `list-promise`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

Promise-aware array iterators.

## Install

    $ npm install --save list-promise

## Usage

```js
import list from 'list-promise';
import fs from 'fs-promise';

list(['src/foo.js', 'src/bar.js'])
    .map(path => fs.readFile(path, 'utf8'))
    .map(file => file.split('').reverse().join(''))
    .reduce((bundle, file) => bundle + file, '')
    .then(bundle => fs.writeFile('bundle.js', buf));
```

## API

### listPromise(list) : ListPromise

- `list` `Array<*|Promise<*>>` A list of items which may or may not be Promises.

Creates a promise with `map` and `reduce` methods that can be used to iterate over list items as they are resolved.

### ListPromise

#### .map(fn): ListPromise

- `fn` `Function(item, i, items) : item` Map callback.

Creates a new `ListPromise` for the results of calling a provided mapper function on every element in the list.

#### .filter(fn): ListPromise

- `fn` `Function(item, i, items) : context` Filter callback.

Creates a new `ListPromise` for the results of calling a provided reducer function on every element in the list.

#### .reduce(fn): Promise

- `fn` `Function(context, item, i, items) : context` Reduce callback.

Creates a new `Promise` for the results of calling a provided reducer function on every element in the list.

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
