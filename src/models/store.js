import db from '../db';
import {success,error} from '../global';

const model = 'store_data';

//Store class for interacting with store object
export default class Store {
	
	//returns all the stores
	async getAll(){
		try {
			let rtn = await db.query(`select id,name,latitude,longitude from ${model}`);
			return success('stores',rtn);
		}catch(e){
			return error(e);
		}
	}

	//returns the store info with the given id
	async get(id){
		try {
			let rtn = await db.query(`select id,name,city,country,start_of_day as opens from ${model} where id=${id}`);
			return success('stores',rtn);
		}catch(e){
			return error(e);
		}
	}
}