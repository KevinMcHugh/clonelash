import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Players from './Players';

class Game extends Component {

  constructor(props){
    super(props)
    this.state = {
      game: null,
      player: null,
      players: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/games/' + this.props.params.id)
      .then(response => {
        this.setState({
          game: response.data
        })
        this._getPlayers()
    }).catch(error => console.log(error))
  }

  _getPlayers() {
    axios.get('http://localhost:3001/games/' + this.props.params.id + '/players')
      .then(response => {
        this.setState({
          players: response.data
        })
    }).catch(error => console.log(error))
  }


  _onSubmit = (e) => {
    e.preventDefault()
    const name = e.target.elements[0].value
    axios.post('http://localhost:3001/players',
      {game_id: this.props.params.id, name: name})
      .then(response => {
        const players = this.state.players
        players.push(response.data)

        this.setState({
          player: response.data,
          players
        })
    }).catch(error => console.log(error))
  }

  render() {
    if (this.state.game) {
      return (
        <div className="App">
          <header className="App-header">
            {this.state.game.state}
            <Players game_id={this.props.params.id} player={this.state.player} />
            {this._renderPlayer()}
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

  _renderPlayer() {
    // can't just store this on the state if the player accidentally navigates away
    if (!this.state.player) {
      return (
        <form onSubmit={this._onSubmit}>
          <input name="name" placeholder="player name"/>
          <button>OK</button>
        </form>
      )
    }
  }
}

export default Game;
