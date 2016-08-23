import koa from 'koa';
import logger from 'koa-logger';
import jsonapi from 'koa-jsonapi-middleware';
import router from 'koa-router';
import User from './models/user';
import Store from './models/store';

//we will keep router in here for now since it's a small class. Ideally would have routes.js for it
const 	api = router(),
		user = new User(),
		store = new Store();

api  //routes
	.get('/stores', async (ctx, next) =>  ctx.body = await store.getAll())
	.get('/stores/:id', async (ctx, next) =>  ctx.body = await store.get(ctx.params.id))
	.get('/users', async (ctx, next) =>  ctx.body = await user.getAll())
	.get('/users/:id', async (ctx, next) =>  ctx.body = await user.get(ctx.params.id, ctx.query));
	
const app = new koa()
  .use(logger()) // Logs information
  .use(jsonapi()) // makes sure requests are json-api compliant
  .use(api.routes()) // Assigns routes
  .use(api.allowedMethods()) //Options allowed methods for api router
  
export default app;