## Synopsis

This is a simple demo of RESTful API with [koajs](http://koajs.com/)

## API Reference

```
GET /stores -> List all the stores

GET /stores/:id -> Returns the store with the given ID

GET /users -> List all the users

GET /users/:id -> Returns the users with the given ID along with their stores

GET /users/:id?type=medianStartTime -> Returns the user with the median start time of the all the stores

GET /users/:id?type=averageVisitors -> Returns the user with the average visitors of all the stores
```

## Motivation

This demo was prepared as part of a coding challenge. For this challenge quite a few new things were learned and used, namely: Koa, es6, es7 (for async / await), and Promises (Bluebird!)

## Tests

```
npm run test
```

## License

MIT