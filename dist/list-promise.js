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

var _concat = Array.prototype.concat;

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
		concat: function concat() {
			var asyncConcat = function () {
				var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(prev, item) {
					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return item;

								case 2:
									item = _context.sent;
									return _context.abrupt("return", _concat.call(prev, item));

								case 4:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this);
				}));
				return function asyncConcat(_x, _x2) {
					return ref.apply(this, arguments);
				};
			}();

			return deepPromise.reduce(asyncConcat, []);
		},
		concatMap: function concatMap(mapper) {
			return deepPromise.map(mapper).concat();
		},
		filter: function filter(filterer) {
			var asyncFilter = function () {
				var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(prev, item, i) {
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
					return ref.apply(this, arguments);
				};
			}();

			return deepPromise.reduce(asyncFilter, []);
		},
		map: function map(mapper) {
			var asyncMap = function () {
				var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(item, i) {
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
					return ref.apply(this, arguments);
				};
			}();

			var localPromise = shallowPromise.then(function (x) {
				return x.map(asyncMap);
			});

			return listPromise(localPromise);
		},
		reduce: function reduce(reducer, init) {
			var asyncReduce = function () {
				var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(prev, item, i) {
					return _regenerator2.default.wrap(function _callee4$(_context4) {
						while (1) {
							switch (_context4.prev = _context4.next) {
								case 0:
									_context4.next = 2;
									return reducer;

								case 2:
									reducer = _context4.sent;
									_context4.next = 5;
									return prev;

								case 5:
									prev = _context4.sent;
									_context4.next = 8;
									return item;

								case 8:
									item = _context4.sent;
									return _context4.abrupt("return", reducer(prev, item, i));

								case 10:
								case "end":
									return _context4.stop();
							}
						}
					}, _callee4, this);
				}));
				return function asyncReduce(_x8, _x9, _x10) {
					return ref.apply(this, arguments);
				};
			}();

			var localPromise = deepPromise.then(function (x) {
				return x.reduce(asyncReduce, init);
			});

			return listPromise(localPromise);
		}
	});
}
module.exports = exports["default"];