import db from '../db';
import {success,error} from '../global';

const model = 'store_data';

//User class for interacting with user model
export default class User {
	
	//returns all the users
	async getAll(){
		try {
			var rtn = await db.query(`select id,name from ${model}`);
			return success('users',rtn);
		}catch(e){
			return error(e);
		}
	};

	//returns the user info with the given id
	async get(id, params){
		if(!params.type){
			params.type = 'userStoresInfo'; //default
		}
		
		//get the median start time of the stores that this user owns
		if(params.type == 'medianStartTime'){
			try {
				var rtn = await db.query(
				`SELECT t1.id as id, STR_TO_DATE(avg(t1.val), '%H:%i:%s') as medianStartTime 
				FROM 
					(SELECT @rownum:=@rownum+1 as row_number, a.val, a.id
					FROM 
						(SELECT @rownum:=0) r, 
						(SELECT s.start_of_day as val, u.id as id
						FROM users u, account_venue av, store_data s
						WHERE u.id = av.user_id AND av.store_id = s.id AND u.id = ${id}
						ORDER BY STR_TO_DATE(s.start_of_day,'%H:%i:%s')) as a
					) as t1, 
					(SELECT count(*) as cnt
					FROM users u, account_venue av, store_data s
					WHERE u.id = av.user_id AND av.store_id = s.id AND u.id = ${id}) as t2
				WHERE t1.row_number in ( floor((cnt+1)/2), floor((cnt+2)/2) );`);
				return success(params.type, rtn);
			}catch(e){
				return error(e);
			}
		}

		var cols;
		if(params.type == 'averageVisitors') {
			//average visitors in stores owned by this user
			cols = "u.id as id, count(*) as totalStores, floor(avg(s.total_visitors)) as averageVisitors";
		}else if(params.type == "userStoresInfo"){
			//all the stores owned by this user
			cols = "u.id as id, s.id as storeId, s.name as storeName, s.start_of_day as startTime, s.total_visitors as totalVisitors";
		}else{
			return error("Incorrect type of user GET call");
		}
		try {
			var rtn = await db.query(
				`select ${cols}
				 from users u, account_venue av, store_data s  
				 where u.id=${id} and u.id = av.user_id and av.store_id = s.id`
			);

			if(params.type == "userStoresInfo"){
				//result change to adhere to RESTful terms
				let tmp = {};
				tmp.id = rtn[0].id;
				for(let i = 0; i < rtn.length; i++){
					delete rtn[i].id;
				}
				tmp.stores = rtn;
				rtn = [tmp];
			}
			return success(params.type, rtn);
		}catch(e){
			return error(e);
		}
	};
}