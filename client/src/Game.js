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
    axios.get('http://localhost:3001/games/' + this.props.params.id)
      .then(response => {
        this.setState({
          game: response.data
        })
    }).catch(error => console.log(error))
  }


  _onSubmit = (e) => {
    e.preventDefault()
    const name = e.target.elements[0].value
    axios.post('http://localhost:3001/players',
      {game_id: this.props.params.id, name: name})
      .then(response => {
        this.setState({
          player: response.data
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
    // can't just store this on the player if the player accidentally navigates away
    if (this.state.player) {
      return (
        <div>
          <label>Current Player:</label>
          {this.state.player.name}
        </div>
      )
    } else {
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
