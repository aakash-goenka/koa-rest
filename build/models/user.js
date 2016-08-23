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

//User class for interacting with user model

var User = function () {
	function User() {
		_classCallCheck(this, User);
	}

	_createClass(User, [{
		key: 'getAll',


		//returns all the users
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var rtn;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return _db2.default.query('select id,name from ' + model);

							case 3:
								rtn = _context.sent;
								return _context.abrupt('return', (0, _global.success)('users', rtn));

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
	}, {
		key: 'get',


		//returns the user info with the given id
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, params) {
				var rtn, cols, tmp, i;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!params.type) {
									params.type = 'userStoresInfo'; //default
								}

								//get the median start time of the stores that this user owns

								if (!(params.type == 'medianStartTime')) {
									_context2.next = 12;
									break;
								}

								_context2.prev = 2;
								_context2.next = 5;
								return _db2.default.query('SELECT t1.id as id, STR_TO_DATE(avg(t1.val), \'%H:%i:%s\') as medianStartTime \n\t\t\t\tFROM \n\t\t\t\t\t(SELECT @rownum:=@rownum+1 as row_number, a.val, a.id\n\t\t\t\t\tFROM \n\t\t\t\t\t\t(SELECT @rownum:=0) r, \n\t\t\t\t\t\t(SELECT s.start_of_day as val, u.id as id\n\t\t\t\t\t\tFROM users u, account_venue av, store_data s\n\t\t\t\t\t\tWHERE u.id = av.user_id AND av.store_id = s.id AND u.id = ' + id + '\n\t\t\t\t\t\tORDER BY STR_TO_DATE(s.start_of_day,\'%H:%i:%s\')) as a\n\t\t\t\t\t) as t1, \n\t\t\t\t\t(SELECT count(*) as cnt\n\t\t\t\t\tFROM users u, account_venue av, store_data s\n\t\t\t\t\tWHERE u.id = av.user_id AND av.store_id = s.id AND u.id = ' + id + ') as t2\n\t\t\t\tWHERE t1.row_number in ( floor((cnt+1)/2), floor((cnt+2)/2) );');

							case 5:
								rtn = _context2.sent;
								return _context2.abrupt('return', (0, _global.success)(params.type, rtn));

							case 9:
								_context2.prev = 9;
								_context2.t0 = _context2['catch'](2);
								return _context2.abrupt('return', (0, _global.error)(_context2.t0));

							case 12:
								if (!(params.type == 'averageVisitors')) {
									_context2.next = 16;
									break;
								}

								//average visitors in stores owned by this user
								cols = "u.id as id, count(*) as totalStores, floor(avg(s.total_visitors)) as averageVisitors";
								_context2.next = 21;
								break;

							case 16:
								if (!(params.type == "userStoresInfo")) {
									_context2.next = 20;
									break;
								}

								//all the stores owned by this user
								cols = "u.id as id, s.id as storeId, s.name as storeName, s.start_of_day as startTime, s.total_visitors as totalVisitors";
								_context2.next = 21;
								break;

							case 20:
								return _context2.abrupt('return', (0, _global.error)("Incorrect type of user GET call"));

							case 21:
								_context2.prev = 21;
								_context2.next = 24;
								return _db2.default.query('select ' + cols + '\n\t\t\t\t from users u, account_venue av, store_data s  \n\t\t\t\t where u.id=' + id + ' and u.id = av.user_id and av.store_id = s.id');

							case 24:
								rtn = _context2.sent;


								if (params.type == "userStoresInfo") {
									//result change to adhere to RESTful terms
									tmp = {};

									tmp.id = rtn[0].id;
									for (i = 0; i < rtn.length; i++) {
										delete rtn[i].id;
									}
									tmp.stores = rtn;
									rtn = [tmp];
								}
								return _context2.abrupt('return', (0, _global.success)(params.type, rtn));

							case 29:
								_context2.prev = 29;
								_context2.t1 = _context2['catch'](21);
								return _context2.abrupt('return', (0, _global.error)(_context2.t1));

							case 32:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[2, 9], [21, 29]]);
			}));

			function get(_x, _x2) {
				return _ref2.apply(this, arguments);
			}

			return get;
		}()
	}]);

	return User;
}();

exports.default = User;