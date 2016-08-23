import { expect } from 'chai';
import request from 'supertest';
import app from '../build/app';

describe('API', () => {
	const inst = app.listen(5050);

	//stores
	describe('GET /stores', () => {
		it('should return 200', async () => {
	      	const res = await request(inst)
	        	.get('/stores')
	        	.set('Accept', 'application/vnd.api+json')
	        	.expect('Content-Type', 'application/vnd.api+json')
	        	.expect(200);
      		expect(res.body).to.not.be.empty;
      		expect(res.body).to.have.property("data").that.is.an("array");
		});
	});

	//stores id get
	describe('GET /stores/:id', () => {
		it('should return 200', async () => {
	      	const res = await request(inst)
	        	.get('/stores/1')
	        	.set('Accept', 'application/vnd.api+json')
	        	.expect('Content-Type', 'application/vnd.api+json')
	        	.expect(200);
      		
      		expect(res.body).to.not.be.empty;
      		expect(res.body).to.have.property("data").that.is.an("object");
      		expect(res.body.data).to.include.keys('id','type','attributes');
      		expect(res.body.data.id).to.be.a("number");
      		expect(res.body.data.type).to.be.a("string");
      		expect(res.body.data.attributes).to.be.an("object");
		});
	});

	//users
	describe('GET /users', () => {
		it('should return 200', async () => {
	      	const res = await request(inst)
	        	.get('/users')
	        	.set('Accept', 'application/vnd.api+json')
	        	.expect('Content-Type', 'application/vnd.api+json')
	        	.expect(200);
      		expect(res.body).to.not.be.empty;
      		expect(res.body).to.have.property("data").that.is.an("array");
		});
	});

	//users id get
	describe('GET /users/:id', () => {
		it('should return 200', async () => {
	      	const res = await request(inst)
	        	.get('/users/1')
	        	.set('Accept', 'application/vnd.api+json')
	        	.expect('Content-Type', 'application/vnd.api+json')
	        	.expect(200);
      		
      		expect(res.body).to.not.be.empty;
      		expect(res.body).to.have.property("data").that.is.an("object");
      		expect(res.body.data).to.include.keys('id','type','attributes');
      		expect(res.body.data.id).to.be.a("number");
      		expect(res.body.data.type).to.be.a("string");
      		expect(res.body.data.attributes).to.be.an("object").that.has.keys("stores");
      		expect(res.body.data.attributes.stores).to.be.an("array");
		});
	});

	//averageVisitors api endpoint check
	describe('GET /users/:id?type=averageVisitors', () => {
		it('should return 200', async () => {
	      	const res = await request(inst)
	        	.get('/users/1?type=averageVisitors')
	        	.set('Accept', 'application/vnd.api+json')
	        	.expect('Content-Type', 'application/vnd.api+json')
	        	.expect(200);
      		
      		expect(res.body).to.not.be.empty;
      		expect(res.body).to.have.property("data").that.is.an("object");
      		expect(res.body.data).to.include.keys('id','type','attributes');
      		expect(res.body.data.id).to.be.a("number");
      		expect(res.body.data.type).to.be.a("string");
      		expect(res.body.data.attributes).to.be.an("object").that.has.keys("averageVisitors","totalStores");
      		expect(res.body.data.attributes.totalStores).to.be.a("number");
      		expect(res.body.data.attributes.averageVisitors).to.be.a("number");
      		
		});
	});

	//medianStartTime api endpoint check
	describe('GET /users/:id?type=medianStartTime', () => {
		it('should return 200', async () => {
	      	const res = await request(inst)
	        	.get('/users/1?type=medianStartTime')
	        	.set('Accept', 'application/vnd.api+json')
	        	.expect('Content-Type', 'application/vnd.api+json')
	        	.expect(200);
      		
      		expect(res.body).to.not.be.empty;
      		expect(res.body).to.have.property("data").that.is.an("object");
      		expect(res.body.data).to.include.keys('id','type','attributes');
      		expect(res.body.data.id).to.be.a("number");
      		expect(res.body.data.type).to.be.a("string");
      		expect(res.body.data.attributes).to.be.an("object").that.has.keys("medianStartTime");
      		expect(res.body.data.attributes.medianStartTime).to.be.a("string");
      		
		});
	});

	//unused api endpoint check
	describe('GET /', () => {
		it('should return 404', async () => {
	      	const res = await request(inst)
	        	.get('/')
	        	.set('Accept', 'application/vnd.api+json')
	        	.expect(404);
	   	});
	});
 });