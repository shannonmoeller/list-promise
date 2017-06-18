"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = listPromise;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const concat = Array.prototype.concat;

function shallowResolve(value) {
	return value && value.shallowPromise || Promise.resolve(value);
}

function deepResolve(value) {
	return shallowResolve(value).then(val => Array.isArray(val) ? Promise.all(val) : val);
}

function listPromise(items) {
	const shallowPromise = shallowResolve(items);
	const deepPromise = deepResolve(items);

	return Object.assign(deepPromise, {
		concat() {
			let asyncConcat = (() => {
				var _ref = _asyncToGenerator(function* (prev, item) {
					item = yield item;

					return concat.call(prev, item);
				});

				return function asyncConcat(_x, _x2) {
					return _ref.apply(this, arguments);
				};
			})();

			return deepPromise.reduce(asyncConcat, []);
		},

		concatMap(mapper) {
			return deepPromise.map(mapper).concat();
		},

		filter(filterer) {
			let asyncFilter = (() => {
				var _ref2 = _asyncToGenerator(function* (prev, item, i) {
					filterer = yield filterer;
					item = yield item;

					if (yield filterer(item, i)) {
						prev.push(item);
					}

					return prev;
				});

				return function asyncFilter(_x3, _x4, _x5) {
					return _ref2.apply(this, arguments);
				};
			})();

			return deepPromise.reduce(asyncFilter, []);
		},

		map(mapper) {
			let asyncMap = (() => {
				var _ref3 = _asyncToGenerator(function* (item, i) {
					mapper = yield mapper;
					item = yield item;

					return mapper(item, i);
				});

				return function asyncMap(_x6, _x7) {
					return _ref3.apply(this, arguments);
				};
			})();

			const localPromise = shallowPromise.then(x => x.map(asyncMap));

			return listPromise(localPromise);
		},

		mapProp(prop, mapper) {
			let asyncMapProp = (() => {
				var _ref4 = _asyncToGenerator(function* (item, i) {
					mapper = yield mapper;
					item = yield item;

					if (item && prop in item) {
						const subItem = yield item[prop];

						item[prop] = yield mapper(subItem, i, item);
					}

					return item;
				});

				return function asyncMapProp(_x8, _x9) {
					return _ref4.apply(this, arguments);
				};
			})();

			return deepPromise.map(asyncMapProp);
		},

		reduce(reducer, init) {
			let asyncReduce = (() => {
				var _ref5 = _asyncToGenerator(function* (prev, item, i) {
					reducer = yield reducer;
					prev = yield prev;
					item = yield item;

					return reducer(prev, item, i);
				});

				return function asyncReduce(_x10, _x11, _x12) {
					return _ref5.apply(this, arguments);
				};
			})();

			const localPromise = deepPromise.then(x => x.reduce(asyncReduce, init));

			return listPromise(localPromise);
		},

		reverse() {
			const localPromise = shallowPromise.then(x => x.slice().reverse());

			return listPromise(localPromise);
		},

		sortBy(sorter) {
			let asyncSortBy = (() => {
				var _ref6 = _asyncToGenerator(function* (item, i) {
					sorter = yield sorter;

					const value = yield item;
					const sortValue = yield sorter(value, i);

					return { value, sortValue };
				});

				return function asyncSortBy(_x13, _x14) {
					return _ref6.apply(this, arguments);
				};
			})();

			function sortBySortValue(a, b) {
				const aSortValue = a.sortValue;
				const bSortValue = b.sortValue;

				if (aSortValue < bSortValue) {
					return -1;
				}

				if (aSortValue > bSortValue) {
					return 1;
				}

				return 0;
			}

			const localPromise = deepPromise.map(asyncSortBy).then(list => list.sort(sortBySortValue)).then(list => list.map(item => item.value));

			return listPromise(localPromise);
		}
	});
}
module.exports = exports["default"];