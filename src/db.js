import mysql from 'promise-mysql';

//connection pool for re-use
const db = mysql.createPool({
 	user: 'turnstyle', 
	password: '52nE7JQr^J1MA1uAO5B7', 
	database: 'turnstyle', 
	host: 'jstest.cg5pr2t62jxq.us-east-1.rds.amazonaws.com',
  	connectionLimit: 10
});

export default db;