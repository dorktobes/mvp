const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/sss', function () {
      mongoose.connection.db.dropDatabase();
});
const Promise = require('bluebird');

let movieSchema = mongoose.Schema({
	hits: Number,
	title: String,
	overview: String,
	popularity: Number,
	posterPath: String
});

let Movie = mongoose.model('Movie', movieSchema);



let actorSchema = mongoose.Schema({
	name: String
});

let Actor = mongoose.model('Actor', actorSchema);


let saveMovies = function (movies, appReq, appRes, payload) {  //movies will be an array
  return new Promise((resolve, reject) => {
    let total = movies.length;
    let saved = 0;
  	if (movies.length > 0) {
  		movies.forEach((movie) => {

  			Movie.find({ title: movie.title}, (err, results) => {
          let currentMovie;
  				if (err) {
            reject(err);
  					console.log('error:', err);
  					// return;
  				}
  				if (results.length) {
            currentMovie = results[0];
            currentMovie.hits++;
            console.log('adding HIT to ', movie.title);
  				} else {
      			  currentMovie = new Movie({
      				hits: 1,
      				title: movie.title,
      				overview: movie.overview,
      				popularity: movie.popularity,
      				posterPath: movie.posterPath
      			});
            }
            currentMovie.save();
            console.log(movie.title, 'SAVED');
            saved++;
            if(saved === total) {
              Movie.find().limit(25).sort('-hits').exec(function(err, movies) {
                if (err) {
                  reject(err);
                  return;
                }
                movies.sort((a, b) => {
                  if (a.hits > b.hits) {
                    return 1;
                  }
                  if (b.hits > a.hits) {
                    return -1;
                  }
                  if (a.hits === b.hits) {
                    return b.popularity - a.popularity;
                  }
                  return 0;
                })
                resolve(movies);
              })
            }
        })
  		})
  	}    
  }).then((data) => {
    payload.movies = data
    appRes.statusCode = 201;
    appRes.end(JSON.stringify(payload))
  })
}

let saveActor = function(name) {
  return new Promise((resolve, reject) => {

    Actor.find({ name: name}, (err, results) => {
      if (err) {
        reject(err);
      }
      if (results.length > 0) {
        console.log(name, 'already exists, DNC');
        reject();
      } else {
        let newActor = new Actor({ name: name})
        newActor.save((err) => {
          if (err) {
            reject(err);
          } 
          Actor.find((err, data) => {
            if (err) {
              console.log(err);
              return;
            } 
            resolve(data);
          })
        });
      }
    })
    
  })
}

exports.saveMovies = saveMovies;
exports.saveActor = saveActor;