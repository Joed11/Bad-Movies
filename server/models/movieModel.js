//Select one db to work with:

//For SQL
const {FavoriteMovies} = require('../../db/sql');
//For Mongo
//const mongoDb = require('../../db/mongodb')

module.exports = {
  save: (movie) => {
    return FavoriteMovies.findOrCreate({
      where: {
        id: movie.id,
        title: movie.title,
        popularity: movie.popularity,
        overview: movie.overview,
        release_date: movie['release_date'],
        thumbnail: movie['poster_path']
      }
    })
  },

  delete: (movieId) => {
    return FavoriteMovies.destroy({
      where: {
        id: movieId,
      }
    })
  },

  findAll: () => {
    return FavoriteMovies.findAll();
  }
}