# `list-promise`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Tip][amazon-img]][amazon-url]

Maximally-concurrent Promise-aware array manipulation via `ListPromise`. They're like the plural form of a Promise or a finite Observable.

## Install

    $ npm install --save list-promise

## Usage

```js
import list from 'list-promise';
import { readFile, writeFile } from 'fs-promise';

// Promisify an array.
list(['src/foo.txt', 'src/bar.txt'])

    // Read each file (callback returns a Promise).
    .map((path) => readFile(path, 'utf8'))

    // Chunk the characters of each file.
    .map((file) => file.split(''))

    // Merge the chunks into a single array.
    .concat()

    // Remove empty chunks.
    .filter((file) => file.length > 0)

    // Sort the characters.
    .sortBy((x) => x)

    // Reverse the characters.
    .reverse()

    // Join chunks into a string.
    .reduce((bundle, file) => bundle + file, '')

    // Write result to a new file.
    .then((bundle) => writeFile('dist/bundle.txt', bundle));
```

## API

### listPromise(list) : ListPromise

- `list` `Array|Promise<Array>` A list of items which may or may not be Promises.

Creates a promise with `map`, `filter`, and `reduce` methods that can be used to iterate over list items as they are resolved.

### ListPromise

#### .map(fn): ListPromise

- `fn` `Function(item, i) : item` Map callback.

Creates a new `ListPromise` for the results of mapping a list with a given map function.

```js
list(['a', 'b'])
    .map((x) => x.toUpperCase());
    .then(console.log);
    // -> ['A', 'B']
```

#### .mapProp(key, fn): ListPromise

- `key` `String|Number` Key of property to modify.
- `fn` `Function(property, i, item) : item` Map callback.

Creates a new `ListPromise` for the results of mapping a list of items' properties with a given map function.

```js
list([{ foo: 'a' }, { foo: 'b' }])
    .mapProp('foo', (x) => x.toUpperCase());
    .then(console.log);
    // -> [{ foo: 'A' }, { foo: 'B' }]
```

#### .concat(): ListPromise

Flattens a list of lists into a single list.

```js
list([['a'], ['b'], ['b', 'c']])
    .concat();
    .then(console.log);
    // -> ['a', 'b', 'b', 'c']
```

#### .concatMap(fn): ListPromise

- `fn` `Function(item, i) : item` Map callback.

Convenience shorthand for `.map(fn).concat()`.

```js
list([{ foo: 'ab' }, { foo: 'bc' }])
    .concatMap((x) => x.foo.split(''));
    .then(console.log);
    // -> ['a', 'b', 'b', 'c']
```

#### .filter(fn): ListPromise

- `fn` `Function(item, i) : context` Filter callback.

Creates a new `ListPromise` for the results of filtering a list with a given filter function.

```js
list([0, 10, 1, 9, 2, 8])
    .filter((x) => x > 5);
    .then(console.log);
    // -> [10, 9, 8]
```

#### .reduce(fn, [initialValue]): ListPromise

- `fn` `Function(context, item, i) : context` Reduce callback.
- `initialValue` `*` (default: `undefined`) Initial value to pass to the reducer.

Creates a new `ListPromise` for the result of reducing a list with a given reducer function. If the reduction results in an array, that array may then be iterated.

```js
list([0, 10, 1, 9, 2, 8])
    .reduce((x, y) => x + y, 1);
    .then(console.log);
    // -> 31
```

#### .reverse(): ListPromise

Creates a new `ListPromise` for the result of reversing the list.

```js
list(['a', 'b', 'c', 1, 2, 3])
    .reverse()
    .then(console.log);
    // -> [3, 2, 1, 'c', 'b', 'a']
```

#### .sortBy(fn): ListPromise

- `fn` `Function(item, i) : any` Sort value getter.

Creates a new `ListPromise` for the result of sorting a list with a property getter function.

```js
list([{ foo: '3' }, { foo: '1' }, { foo: '2' }])
    .sortBy((x) => x.foo);
    .then(console.log);
    // -> [{ foo: '1' }, { foo: '2' }, { foo: '3' }]
```

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
[npm-img]:       http://img.shields.io/npm/v/list-promise.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/list-promise
[travis-img]:    http://img.shields.io/travis/shannonmoeller/list-promise/master.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/list-promise
