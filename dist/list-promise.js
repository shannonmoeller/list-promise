"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = listPromise;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var concat = Array.prototype.concat;

function shallowResolve(value) {
	return value && value.shallowPromise || _promise2.default.resolve(value);
}

function deepResolve(value) {
	return shallowResolve(value).then(function (val) {
		return Array.isArray(val) ? _promise2.default.all(val) : val;
	});
}

function listPromise(items) {
	var shallowPromise = shallowResolve(items);
	var deepPromise = deepResolve(items);

	return (0, _assign2.default)(deepPromise, {
		concat() {
			var asyncConcat = function () {
				var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(prev, item) {
					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return item;

								case 2:
									item = _context.sent;
									return _context.abrupt("return", concat.call(prev, item));

								case 4:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

				return function asyncConcat(_x, _x2) {
					return _ref.apply(this, arguments);
				};
			}();

			return deepPromise.reduce(asyncConcat, []);
		},

		concatMap(mapper) {
			return deepPromise.map(mapper).concat();
		},

		filter(filterer) {
			var asyncFilter = function () {
				var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(prev, item, i) {
					return _regenerator2.default.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									_context2.next = 2;
									return filterer;

								case 2:
									filterer = _context2.sent;
									_context2.next = 5;
									return item;

								case 5:
									item = _context2.sent;
									_context2.next = 8;
									return filterer(item, i);

								case 8:
									if (!_context2.sent) {
										_context2.next = 10;
										break;
									}

									prev.push(item);

								case 10:
									return _context2.abrupt("return", prev);

								case 11:
								case "end":
									return _context2.stop();
							}
						}
					}, _callee2, this);
				}));

				return function asyncFilter(_x3, _x4, _x5) {
					return _ref2.apply(this, arguments);
				};
			}();

			return deepPromise.reduce(asyncFilter, []);
		},

		map(mapper) {
			var asyncMap = function () {
				var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(item, i) {
					return _regenerator2.default.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return mapper;

								case 2:
									mapper = _context3.sent;
									_context3.next = 5;
									return item;

								case 5:
									item = _context3.sent;
									return _context3.abrupt("return", mapper(item, i));

								case 7:
								case "end":
									return _context3.stop();
							}
						}
					}, _callee3, this);
				}));

				return function asyncMap(_x6, _x7) {
					return _ref3.apply(this, arguments);
				};
			}();

			var localPromise = shallowPromise.then(function (x) {
				return x.map(asyncMap);
			});

			return listPromise(localPromise);
		},

		mapProp(prop, mapper) {
			var asyncMapProp = function () {
				var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(item, i) {
					var subItem;
					return _regenerator2.default.wrap(function _callee4$(_context4) {
						while (1) {
							switch (_context4.prev = _context4.next) {
								case 0:
									_context4.next = 2;
									return mapper;

								case 2:
									mapper = _context4.sent;
									_context4.next = 5;
									return item;

								case 5:
									item = _context4.sent;

									if (!(item && prop in item)) {
										_context4.next = 13;
										break;
									}

									_context4.next = 9;
									return item[prop];

								case 9:
									subItem = _context4.sent;
									_context4.next = 12;
									return mapper(subItem, i, item);

								case 12:
									item[prop] = _context4.sent;

								case 13:
									return _context4.abrupt("return", item);

								case 14:
								case "end":
									return _context4.stop();
							}
						}
					}, _callee4, this);
				}));

				return function asyncMapProp(_x8, _x9) {
					return _ref4.apply(this, arguments);
				};
			}();

			return deepPromise.map(asyncMapProp);
		},

		reduce(reducer, init) {
			var asyncReduce = function () {
				var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(prev, item, i) {
					return _regenerator2.default.wrap(function _callee5$(_context5) {
						while (1) {
							switch (_context5.prev = _context5.next) {
								case 0:
									_context5.next = 2;
									return reducer;

								case 2:
									reducer = _context5.sent;
									_context5.next = 5;
									return prev;

								case 5:
									prev = _context5.sent;
									_context5.next = 8;
									return item;

								case 8:
									item = _context5.sent;
									return _context5.abrupt("return", reducer(prev, item, i));

								case 10:
								case "end":
									return _context5.stop();
							}
						}
					}, _callee5, this);
				}));

				return function asyncReduce(_x10, _x11, _x12) {
					return _ref5.apply(this, arguments);
				};
			}();

			var localPromise = deepPromise.then(function (x) {
				return x.reduce(asyncReduce, init);
			});

			return listPromise(localPromise);
		},

		reverse() {
			var localPromise = shallowPromise.then(function (x) {
				return x.slice().reverse();
			});

			return listPromise(localPromise);
		},

		sortBy(sorter) {
			var asyncSortBy = function () {
				var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(item, i) {
					var value, sortValue;
					return _regenerator2.default.wrap(function _callee6$(_context6) {
						while (1) {
							switch (_context6.prev = _context6.next) {
								case 0:
									_context6.next = 2;
									return sorter;

								case 2:
									sorter = _context6.sent;
									_context6.next = 5;
									return item;

								case 5:
									value = _context6.sent;
									_context6.next = 8;
									return sorter(value, i);

								case 8:
									sortValue = _context6.sent;
									return _context6.abrupt("return", { value, sortValue });

								case 10:
								case "end":
									return _context6.stop();
							}
						}
					}, _callee6, this);
				}));

				return function asyncSortBy(_x13, _x14) {
					return _ref6.apply(this, arguments);
				};
			}();

			function sortBySortValue(a, b) {
				var aSortValue = a.sortValue;
				var bSortValue = b.sortValue;

				if (aSortValue < bSortValue) {
					return -1;
				}

				if (aSortValue > bSortValue) {
					return 1;
				}

				return 0;
			}

			var localPromise = deepPromise.map(asyncSortBy).then(function (list) {
				return list.sort(sortBySortValue);
			}).then(function (list) {
				return list.map(function (item) {
					return item.value;
				});
			});

			return listPromise(localPromise);
		}
	});
}
module.exports = exports["default"];