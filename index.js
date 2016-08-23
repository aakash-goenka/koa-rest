require('babel-polyfill');	//used for async

const 	port = process.env.PORT || 5050,
		env = process.env.NODE_ENV || 'production',	//development env es7
		src = (env === 'production') ? './build/app' : './src/app',
		app = require(src).default;

if (env === 'development') {
  	// for development use babel/register for faster runtime compilation
  	require('babel-register');
}

app.listen(port, () => console.log(`Listening on port ${port}.`));