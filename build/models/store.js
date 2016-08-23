'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _global = require('../global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var model = 'store_data';

//Store class for interacting with store object

var Store = function () {
	function Store() {
		_classCallCheck(this, Store);
	}

	_createClass(Store, [{
		key: 'getAll',


		//returns all the stores
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var rtn;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return _db2.default.query('select id,name,latitude,longitude from ' + model);

							case 3:
								rtn = _context.sent;
								return _context.abrupt('return', (0, _global.success)('stores', rtn));

							case 7:
								_context.prev = 7;
								_context.t0 = _context['catch'](0);
								return _context.abrupt('return', (0, _global.error)(_context.t0));

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 7]]);
			}));

			function getAll() {
				return _ref.apply(this, arguments);
			}

			return getAll;
		}()

		//returns the store info with the given id

	}, {
		key: 'get',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
				var rtn;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								_context2.next = 3;
								return _db2.default.query('select id,name,city,country,start_of_day as opens from ' + model + ' where id=' + id);

							case 3:
								rtn = _context2.sent;
								return _context2.abrupt('return', (0, _global.success)('stores', rtn));

							case 7:
								_context2.prev = 7;
								_context2.t0 = _context2['catch'](0);
								return _context2.abrupt('return', (0, _global.error)(_context2.t0));

							case 10:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[0, 7]]);
			}));

			function get(_x) {
				return _ref2.apply(this, arguments);
			}

			return get;
		}()
	}]);

	return Store;
}();

exports.default = Store;