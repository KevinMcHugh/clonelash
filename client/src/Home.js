import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Game from './Game';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      games: [],
      gameId: null,
      playerName: null
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

          <form onSubmit={this._onSubmit}>
            <label>Your Name:</label>
            <input id="name" onChange={this._onInputChange}/>
            <button>New Game</button>
          </form>

        </header>
      </div>
    );
  }

  onClick = (gameId) => {
    this.setState({ gameId })
  };

  _onSubmit = (e) => {
    e.preventDefault()
    axios.post('games.json', { game: { player_name: this.state.playerName }}).then(response => {
      this.setState({gameId: response.data.id })
    })
  }

  _onInputChange = (e) => {
    this.setState({ playerName: e.target.value})
  }
}

export default Home;
