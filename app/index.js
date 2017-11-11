import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      movies: [],
    }
  }

  render() {
    return (
      <div>React is bae</div>
      )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
