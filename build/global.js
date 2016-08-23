"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.success = success;
exports.error = error;
function successObject(type, id, obj) {
	return {
		"type": type,
		"id": id,
		"attributes": obj
	};
}

//used for sending jsonapi success
function success(type, obj) {
	var data = [];
	for (var i = 0; i < obj.length; i++) {
		var id = obj[i].id;
		delete obj[i].id;
		data.push(successObject(type, id, obj[i]));
	}
	if (data.length == 1) {
		data = data[0];
	}
	return { "data": data };
}

//used for sending errors
function error(obj) {
	return { "errors": obj };
}