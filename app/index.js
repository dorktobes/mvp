import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      actors: [],
      movies: [],
    }
  }
  getActor(event) {
    let actor = event.target.value;
    this.setState({query: actor});
  }
  submitActor() {
    let actor = this.state.query;
    console.log('searching for', actor);

    $.ajax({
      method: 'POST',
      url: '/actors',
      data: JSON.stringify(actor),
      success: ()=> {
        console.log('boom goes the dynamite!');

      },
      error: (err) => {
        console.log('Post could not be completed', err);
      }

    })
  }
//TODO make a 'movie' component that will have pertinent information instead of just a list.
  render() {
    return (
      <div>
        <h2>Silver Screen Suggestor</h2>
        <br></br>
        <div>Who is an actor you like?</div>
        <form>
          <input type='text' onChange={this.getActor.bind(this)}/><button type="button" onClick={this.submitActor.bind(this)}>Submit</button>
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
