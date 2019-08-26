import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Admin from './Admin';
import Players from './Players';
import PlayerMessages from './PlayerMessages';
import Cookies from 'universal-cookie';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';

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
        this.props.setCookies(response.data.id, this.props.id)
        this.setState({
          player: response.data,
        })
    }).catch(error => console.log(error))
  }

  render() {
    const gameChannel = { channel: 'GameChannel', id: this.props.id }
    const protocol = (window.location.protocol == "http:" ? "ws://" : "wss://")
    const port = (!!window.location.port ? ":3001" : "")
    if (this.state.game) {
      return (
        <ActionCableProvider url={protocol + window.location.hostname + port + "/cable"}>
          <div className="App">
            <ActionCableConsumer channel={gameChannel}
                                 onReceived={this.handleReceivedGame} />
            <header className="App-header">
              game state: {this.state.game.state}
            </header>
            <div className="App-body">
              <div className="App-player">{this._renderPlayer()}</div>
              <Players game_id={this.props.id} player={this.state.player} winners={this.state.game.winners} />
            </div>
            <footer className="App-footer">
              <Admin game_id={this.props.id} player={this.state.player}/>
              <button onClick={this.props.unsetCookies}>Leave the game now!</button>
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
