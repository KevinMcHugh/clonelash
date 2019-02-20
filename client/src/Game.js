import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class Game extends Component {

  constructor(props){
    super(props)
    this.state = {
      game: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001' + window.location.pathname)
      .then(response => {
        this.setState({
          game: response.data
        })
    }).catch(error => console.log(error))
  }

  render() {
    if (this.state.game) {
      return (
        <div className="App">
          <header className="App-header">
            {this.state.game.state}
            {(this.state.game.messages || []).map (message => {
              return (<div>{message}</div>)
            })}
          </header>
        </div>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          hang on...
        </header>
      </div>
    )
  }
}

export default Game;
