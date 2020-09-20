const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    console.log('genre id request from client', req.query.id)
    apiHelpers.getBadMoviesByGenre(req.query.id)
      .then((response) => {
        res.status(200).send(response.data)
      })
      .catch((error) => {
        console.log('error getting movies from api', error);
        res.status(404).send('Could not get movie list');
      })
    // get the search genre

    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    apiHelpers.getGenres()
      .then((response) => {
        console.log('api genre response')
        res.status(200).send(response.data)
      })
      .catch((error) => {
        console.log('error getting genres from api', error);
        res.status(404).send('Could not get genre list');
      })
  },
  getFavorites: (req, res) => {
    console.log('got request for favorite movies');
    return movieModel.findAll()
      .then((response) => {
        console.log('get favorites db response', response)
        res.status(200).send(response)
      })
      .catch((error) => {
        console.log('error getting favorites from db', error);
        res.status(404).send('Could not retrieve favorites from db');
      })
  },
  saveMovie: (req, res) => {
    console.log('save movies request', req.body);
    return movieModel.save(req.body)
      .then((response) => {
        console.log('save favorite movie db response', response)
        res.sendStatus(200)
      })
      .catch((error) => {
        console.log('error saving movie to db', error);
        res.status(500).send('Could not save movie to db');
      })
  },
  deleteMovie: (req, res) => {
    console.log('got request to delete movies', req.query);
    return movieModel.delete(req.query.movieId)
      .then((response) => {
        console.log('delete favorite db response', response)
        res.sendStatus(200)
      })
      .catch((error) => {
        console.log('error deleting from db', error);
        res.status(500).send('Could not delete from db');
      })
  }
}