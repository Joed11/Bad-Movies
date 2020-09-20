import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  handleClick(e) {
    if (this.props.showFaves === false) {
      console.log('SAVING!', e.target)
      this.props.saveMovie(movie);
    } else {
      this.props.deleteMovie(movie);
    }
  }

  render() {
    return (
      <ul className="movies">
      {this.props.movies.map(movie => {
        var release;
        if (movie.release_date) {
        release = movie.release_date.slice(0,4);
        } else {
        release = 'N/A';
        }
        return (
        <li className="movie_item" key={movie.id} onClick={(e) => this.handleClick(e)}>
          <img src="https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300" />
          <div className="movie_description">
            <h2>{movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Year</span>
                <span>{release}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>{movie.popularity}</span>
              </div>
            </section>
          </div>
        </li>
        )
      })}
      </ul>
    );
  }
}

export default Movies;