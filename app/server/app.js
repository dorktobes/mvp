const path = require('path');
// import path from 'path';
const express = require('express');
// import express from 'express';

const app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../public/index.html');

app.use(publicPath);

app.get('/', (req, res) => {
	console.log('GET REQUEST RECEIVED ON SLASH PATH!')
	res.sendFile(indexPath);
})

exports.app = app;