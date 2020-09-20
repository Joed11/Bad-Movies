import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    axios.get('/movies/genres')
      .then((response) => {
        console.log(response.data.genres)
        this.setState({
          genres: response.data.genres
        })
      })
      .catch((err) => {
        console.log('error getting genre list', err)
      })
  }

  handleSearchClick() {
    var genreId = document.getElementById('select-genre').value;
    console.log('genreId gathered from select element', genreId)
    this.props.getMovies(genreId);
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select id="select-genre">
          {this.state.genres.map((genre) => {
            return <option className="genre-list-item" key={genre.id} value={genre.id}>{genre.name}</option>
          })}
        </select>
        <br/><br/>
        <button onClick={this.handleSearchClick}>Search</button>

      </div>
    );
  }
}

export default Search;