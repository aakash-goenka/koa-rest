'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaJsonapiMiddleware = require('koa-jsonapi-middleware');

var _koaJsonapiMiddleware2 = _interopRequireDefault(_koaJsonapiMiddleware);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _store = require('./models/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//we will keep router in here for now since it's a small class. Ideally would have routes.js for it
var api = (0, _koaRouter2.default)(),
    user = new _user2.default(),
    store = new _store2.default();

api //routes
.get('/stores', function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
								switch (_context.prev = _context.next) {
										case 0:
												_context.next = 2;
												return store.getAll();

										case 2:
												return _context.abrupt('return', ctx.body = _context.sent);

										case 3:
										case 'end':
												return _context.stop();
								}
						}
				}, _callee, undefined);
		}));

		return function (_x, _x2) {
				return _ref.apply(this, arguments);
		};
}()).get('/stores/:id', function () {
		var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
								switch (_context2.prev = _context2.next) {
										case 0:
												_context2.next = 2;
												return store.get(ctx.params.id);

										case 2:
												return _context2.abrupt('return', ctx.body = _context2.sent);

										case 3:
										case 'end':
												return _context2.stop();
								}
						}
				}, _callee2, undefined);
		}));

		return function (_x3, _x4) {
				return _ref2.apply(this, arguments);
		};
}()).get('/users', function () {
		var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
						while (1) {
								switch (_context3.prev = _context3.next) {
										case 0:
												_context3.next = 2;
												return user.getAll();

										case 2:
												return _context3.abrupt('return', ctx.body = _context3.sent);

										case 3:
										case 'end':
												return _context3.stop();
								}
						}
				}, _callee3, undefined);
		}));

		return function (_x5, _x6) {
				return _ref3.apply(this, arguments);
		};
}()).get('/users/:id', function () {
		var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx, next) {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
						while (1) {
								switch (_context4.prev = _context4.next) {
										case 0:
												_context4.next = 2;
												return user.get(ctx.params.id, ctx.query);

										case 2:
												return _context4.abrupt('return', ctx.body = _context4.sent);

										case 3:
										case 'end':
												return _context4.stop();
								}
						}
				}, _callee4, undefined);
		}));

		return function (_x7, _x8) {
				return _ref4.apply(this, arguments);
		};
}());

var app = new _koa2.default().use((0, _koaLogger2.default)()) // Logs information
.use((0, _koaJsonapiMiddleware2.default)()) // makes sure requests are json-api compliant
.use(api.routes()) // Assigns routes
.use(api.allowedMethods()); //Options allowed methods for api router

exports.default = app;