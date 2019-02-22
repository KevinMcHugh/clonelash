import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

class Players extends Component {

  constructor(props){
    super(props)
    this.state = {
      players: [],
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

  handleReceivedPlayer = (response) => {
    let players = this.state.players;
    players.push(response)
    console.log(response)
    this.setState({
      players
    });
  };

  render() {
    const channel = { channel: 'PlayerChannel', id: this.props.game_id }
    const playerId = (this.props.player || {}).id
    if (this.state.players) {
      return (
        <ActionCableProvider url={API_WS_ROOT}>
          <div>
            <ActionCableConsumer
              channel={channel}
              onReceived={this.handleReceivedPlayer} />
            {this.state.players.map (player => {
              return (<div key={player.id}>{player.name} {player.id === playerId ? "*" : "" }</div>)
            })}
            {this._renderCurrentPlayer()}
          </div>
        </ActionCableProvider>
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