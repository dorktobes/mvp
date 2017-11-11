import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      movies: [],
    }
  }
  submitActor(event) {
    let actor = event.target.value;
    console.log('submitting', actor);
  }
//TODO make a 'movie' component that will have pertinent information instead of just a list.
  render() {
    return (
      <div>
        <h2>Silver Screen Suggestor</h2>
        <br></br>
        <div>Who is an actor you like?</div>
        <form>
          <input type='text' /><button type="button" onClick={this.submitActor.bind(this)}>Submit</button>
        </form>
        <br></br>
        <br></br>
        <h3>Your Favorite Actors</h3>
        <ul>
          {this.state.actors.map((actor) => (
            <li>{actor}</li>
            ))}
        </ul>
        <br></br>
        <br></br>
        <h3>Movies you might like</h3>
        <ul>
          {this.state.movies.map((movie) => (
            <li><a href={movie.url}>{movie.title}</a></li>
            ))}
        </ul>
      </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
