const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/sss');
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


let saveMovies = function (movies, appReq, appRes) {  //movies will be an array
  return new Promise((resolve, reject) => {
    let total = movies.length;
    let saved = 0;
  	if (movies.length > 0) {
  		movies.forEach((movie) => {

  			Movie.find({ title: movie.title}, (err, results) => {
          let currentMovie;
  				if (err) {
            reject(err);
  					console.log(err);
  					return;
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
            currentMovie.save((err)=> {console.log(err)});
            console.log(movie.title, 'SAVED');
            saved++;
            if(saved === total) {
              Movie.find(function(err, movies) {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(movies);
              })
            }
        })
  		})
  	}    
  }).then((data) => {
    appRes.statusCode = 201;
    appRes.end(JSON.stringify(data))
  })
}

exports.saveMovies = saveMovies;