import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

class Players extends Component {

  constructor(props){
    super(props)
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/games/' + this.props.game_id + '/players')
      .then(response => {
        this.setState({
          players: response.data
        })
    }).catch(error => console.log(error))
  }

  render() {
    const playerId = (this.props.player || {}).id
    if (this.state.players) {
      return (
        <div>
          {this.state.players.map (player => {
            return (<div key={player.id}>{player.name} {player.id == playerId ? "*" : "" }</div>)
          })}
          {this._renderCurrentPlayer()}
        </div>
      )
    }

    return (
      <div>
        hang on...
      </div>
    )
  }

  _renderCurrentPlayer() {
    if (this.props.player) {
      return (<div key={this.props.player.id}>{this.props.player.name}"*"</div>)
    }
  }
}

export default Players