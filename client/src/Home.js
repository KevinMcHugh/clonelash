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
      gameId: cookies.get('game_id')
    }
  }

  componentWillMount() {
    axios.defaults.baseURL = "/api"
  }

  render() {
    if (this.state.gameId) {
      return <Game id={this.state.gameId} setCookies={this._setCookies} unsetCookies={() => this._unsetCookies()}/>
    }
    return (
      <div className="App">
        <header className="App-header" />
        <div className="game-links">
          <a onClick={this.onClickGame}> Join the existing Game </a>
        </div>
        {this._renderNewGameButton()}
      </div>
    );
  }

  _renderNewGameButton = () => {
    return (
      <div className="new-game">
        <a onClick={this._onClickNewGame}>Start Your Own Game</a>
      </div>
    )
  }

  onClickGame = () => {
    axios.get('games/current.json')
      .then(response => {
        this.setState({ gameId: response.data.id })
    }).catch(error => console.log(error))
  };

  _onClickNewGame = (e) => {
    e.preventDefault()
    axios.post('games.json').then(response => {
      this._setCookies(response.data.started_by_id, response.data.id)
      this.setState({gameId: response.data.id })
    })
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
