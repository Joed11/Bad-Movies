import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

var MovieList = (props) => {
  return (
    <ul className="movies">
    {props.movies.map(currMovie => {
        return <MovieListEntry className="movie_item" key={currMovie.id} movie={currMovie} saveMovie={props.saveMovie} deleteMovie={props.deleteMovie} showFaves={props.showFaves}/>
    })}
    </ul>
  );
}

export default MovieList;