'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promiseMysql = require('promise-mysql');

var _promiseMysql2 = _interopRequireDefault(_promiseMysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//connection pool for re-use
var db = _promiseMysql2.default.createPool({
	user: 'turnstyle',
	password: '52nE7JQr^J1MA1uAO5B7',
	database: 'turnstyle',
	host: 'jstest.cg5pr2t62jxq.us-east-1.rds.amazonaws.com',
	connectionLimit: 10
});

exports.default = db;