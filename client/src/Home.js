import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Game from './Game';
import Cookies from 'universal-cookie';

class Home extends Component {

  constructor(props){
    super(props)
    const cookies = new Cookies();

    this.state = {
      games: [],
      gameId: cookies.get('game_id'),
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
    // should look for player id cookie, see if a game is in progress, autoload that game, etc.
    if (this.state.gameId) {
      return <Game id={this.state.gameId} setCookies={this._setCookies} unsetCookies={() => this._unsetCookies()}/>
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
      this._setCookies(response.data.started_by_id, response.data.id)
      this.setState({gameId: response.data.id })
    })
  }

  _onInputChange = (e) => {
    this.setState({ playerName: e.target.value})
  }

  _setCookies(playerId, gameId) {
    const cookies = new Cookies();
    cookies.set('player_id', playerId, { path: '/' });
    cookies.set('game_id', gameId, { path: '/' });
  }

  _unsetCookies() {
    const cookies = new Cookies();
    cookies.remove('player_id')
    cookies.remove('game_id')

    this.setState({gameId: null})
  }
}

export default Home;
