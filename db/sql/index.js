const Sequelize = require('sequelize');
const mysql = require('mysql2');
const mysqlConfig = require('../../config/config.js');

const badmovieDB = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  dialect: 'mysql'
})

badmovieDB.authenticate()
  .then(() => {
    console.log('Connected to badmovies database')
  })
  .catch((err) => {
    console.log('Error connecting to baddmovies database', err)
  });


var FavoriteMovies = badmovieDB.define('favoriteMovieList', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  popularity: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
  },
  overview: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  release_date: {
    type: Sequelize.STRING,
  },
  thumbnail: {
    type: Sequelize.STRING,
  }
});

FavoriteMovies.sync({ alter: true });

module.exports.FavoriteMovies = FavoriteMovies;