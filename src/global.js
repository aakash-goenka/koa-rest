function successObject(type, id, obj){
	return {
		"type":type,
		"id":id,
		"attributes":obj
	};
}

//used for sending jsonapi success
export function success(type, obj){
	var data = [];
	for(let i = 0; i < obj.length; i++){
		let id = obj[i].id;
		delete obj[i].id;
		data.push(successObject(type, id, obj[i]));
	}
	if(data.length == 1){
		data = data[0];
	}
	return {"data":data};
}

//used for sending errors
export function error(obj){
	return {"errors":obj};
}