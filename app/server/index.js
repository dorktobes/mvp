// import app from './app';
const app = require('./app');
const port = process.env.PORT || 1337;

app.app.listen(port, (err)=> {
	if (err) {
		console.log(err);
		return;
	}
	console.log(`Listening at http://localhost:${port}`);
});