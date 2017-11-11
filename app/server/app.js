const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../public/index.html');

app.use(publicPath);
app.post(bodyParser.json());

app.get('/', (req, res) => {
	console.log('GET REQUEST RECEIVED ON SLASH PATH!')
	res.sendFile(indexPath);
})

app.post('/actors', (req, res) => {
	console.log('Post request recieved to /actors');
	req.on('data', (packet) => {
		console.log(packet + '');
	})

	res.statusCode = 201;
	res.end();
})

exports.app = app;