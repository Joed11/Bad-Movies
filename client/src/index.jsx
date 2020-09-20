import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import MovieList from './components/MovieList.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };

    // you might have to do something important here!
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getMovies('12');
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/movies/search', {params: {id: genreId}})
     .then((response) => {
       console.log('get movie response', response.data);
       this.setState({
         movies: response.data.results,
         showFaves: false
       })
     })
     .catch((err) => {
       console.log('error getting movies from server', err)
     });
  }

  getFavorites() {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/movies/favorites')
     .then((response) => {
       console.log('favorite movie response', response.data);
       this.setState({
         favorites: response.data,
       })
     })
     .catch((err) => {
       console.log('error getting favorite movies from server', err)
     });
  }

  saveMovie(movie) {
    console.log('outgoing movie', movie)
    axios.post('/movies/save', movie)
     .then((response) => {
       console.log('saved the movie');
     })
     .catch((err) => {
       console.log('error saving movie to server', err)
     });
  }

  deleteMovie(movie) {
    axios.delete('/movies/delete', {params: {movieId: movie.id}})
     .then((response) => {
       console.log('deleted the movie');
     })
     .then(() => {
       this.getFavorites();
     })
     .catch((err) => {
       console.log('error deleting movie from server', err)
     });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    }, () => {
      if (this.state.showFaves === true) {
        this.getFavorites();
      }
    })
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <MovieList movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));