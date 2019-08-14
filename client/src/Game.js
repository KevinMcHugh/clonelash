import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Admin from './Admin';
import Players from './Players';
import PlayerMessages from './PlayerMessages';
import Cookies from 'universal-cookie';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

class Game extends Component {

  constructor(props){
    super(props)
    this.state = {
      game: null,
      player: null,
      messages: []
    }
  }

  componentDidMount() {
    axios.defaults.baseURL = "/api"

    axios.get('games/' + this.props.id)
      .then(response => {
        this.setState({
          game: response.data
        })
    }).catch(error => console.log(error))
    const cookies = new Cookies();
    if (cookies.get('player_id')) {
      axios.get('players/' + cookies.get('player_id'))
        .then(response => {
          this.setState({
            player: response.data
          })
      }).catch(error => console.log(error))
    }
  }

  handleReceivedGame = (response) => {
    if (response.message_type === 'Game') {
      this.setState({
        game: response
      })
    }
  }

  _onSubmit = (e) => {
    e.preventDefault()
    const name = e.target.elements[0].value
    axios.post('players',
      {game_id: this.props.id, name: name})
      .then(response => {
        const cookies = new Cookies();
        cookies.set('player_id', response.data.id, { path: '/' });

        this.setState({
          player: response.data,
        })
    }).catch(error => console.log(error))
  }

  render() {
    // that host doesn't work for dev, fwiw, and the scheme will have to be ws in dev.
    const gameChannel = { channel: 'GameChannel', id: this.props.id }

    if (this.state.game) {
      return (
        <ActionCableProvider url={"ws://" + window.location.host + "/cable"}>
          <div className="App">
            <ActionCableConsumer channel={gameChannel}
                                 onReceived={this.handleReceivedGame} />
            <header className="App-header">
              game state: {this.state.game.state}
            </header>
            <div className="App-body">
              {this._renderStartOrWait()}
              <div className="App-player">{this._renderPlayer()}</div>
              <Players game_id={this.props.id} player={this.state.player} />
            </div>
            <footer className="App-footer">
              <Admin game_id={this.props.id}/>
            </footer>
          </div>
        </ActionCableProvider>
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

  _renderStartOrWait() {
    if (this.state.game.state === "created") {
      if (this.state.game.startable) {
        return (<button onClick={(e) => this._startGame(e)}>Start the game now!</button>)
      } else {
        return (<div> Waiting for more players! </div>)
      }
    }
  }

  _startGame = (e) => {
    e.preventDefault()
    axios.put('games/' + this.props.params.id,
      {game: { state: 'started'}})
      .then(response => {
        this.setState({
          game: response.data,
        })
    }).catch(error => console.log(error))
  }

  _renderPlayer() {
    if (!this.state.player) {
      if (this.state.game.state !== 'created') {
        return <div> Sorry, you are too late to join the game, but have fun voting!</div>
      } else {
        return (
          <form onSubmit={this._onSubmit}>
            <input name="name" placeholder="player name"/>
            <button>OK</button>
          </form>
        )
      }
    } else {
      return (<PlayerMessages playerId={this.state.player.id} game={this.state.game} />)
    }
  }
}

export default Game;
