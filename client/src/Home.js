import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Game from './Game';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      games: [],
      gameId: null
    }
  }

  componentWillMount() {
    axios.defaults.baseURL = "/api"

    axios.get('games.json')
      .then(response => {
        this.setState({
          games: response.data
        })
    }).catch(error => console.log(error))
  }

  render() {
    if (this.state.gameId) {
      return <Game id={this.state.gameId} />
    }
    return (
      <div className="App">
        <header className="App-header">
          This is not Quiplash

          {this.state.games.map (game => {
            return (<a key={game.id} onClick={() => this.onClick(game.id)}> {game.id} </a>)
          })}

        </header>
      </div>
    );
  }

  onClick = (gameId) => {
    this.setState({ gameId })
  };
}

export default Home;
