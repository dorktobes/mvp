const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const imdb = require('imdb-api');
const request = require('request');
const TMDB_KEY = require('./config.js');
const save = require('../db/db.js');

const app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../public/index.html');

app.use(publicPath);
app.post(bodyParser.json({}));

app.get('/', (req, res) => {
	console.log('GET REQUEST RECEIVED ON SLASH PATH!')
	res.sendFile(indexPath);
})

app.post('/actors', (topReq, topRes) => {
	console.log('Post request recieved to /actors');
  let payload = {};
	
	topReq.on('data', (packet) => {
		let actor = packet + '';
		actor = actor.substring(1, actor.length-1);
		let actorArr = actor.split(' ');
		actorArr = actorArr.map((namePart) => {
			return namePart[0].toUpperCase() + namePart.substring(1);
		})
    save.saveActor(actorArr.join(' ')).then((actors) => {
      console.log(actors);
      payload.actors = actors;
  		actor = actorArr.join('%20');



  		request(`https://api.themoviedb.org/3/search/person?include_adult=false&page=1&query=${actor}&language=en-US&api_key=${TMDB_KEY.TMDB_KEY}`, (err, res, body) => {
  			if (err) {
  				console.log(err);
  				return;
  			}
  			let results = JSON.parse(body).results;
  			if(results && results.length > 0) {
          //store actor in db
          let personId = results[0].id;
          request(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${TMDB_KEY.TMDB_KEY}&language=en-US`, (err, res, body) => {
            if (err) {
              console.log(err);
              return;
            }
            let movies = JSON.parse(body).cast;
            // console.log('inside of app.js', topRes);
            save.saveMovies(movies, topReq, topRes, payload);
          })
  			}
  		});

    })


		// imdb.getReq({name: 'Citizen Kane'},{apiKey: '70028914', timeout: 30000}).then(console.log).catch(console.log);
	})


})

exports.app = app;

//ec818c14a2fb4f1bf3e6f146e458028c