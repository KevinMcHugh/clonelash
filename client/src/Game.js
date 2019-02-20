import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

class Game extends Component {

  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/games.json')
      .then(response => {
        console.log(response)
        this.setState({
          games: response.data
        })
    }).catch(error => console.log(error))
  }

  _onClick(gameId) {
    console.log(gameId)
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          game
        </header>
      </div>
    );
  }
}

export default Game;
