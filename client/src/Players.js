import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';
import './Players.css';

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
    if (response.message_type == 'Player') {
      let players = this.state.players;
      if (!players.some(p => p.id === response.id)) {
        players.push(response)
      }
      console.log(response)
      this.setState({
        players
      });
    }
  };

  render() {
    const channel = { channel: 'GameChannel', id: this.props.game_id }
    const playerId = (this.props.player || {}).id
    if (this.state.players) {
      return (
        <div className='Player-container'>
          <ActionCableConsumer
            channel={channel}
            onReceived={this.handleReceivedPlayer} />
          {this.state.players.map (player => {
            return (
              <div key={player.id} className={player.id === playerId ? 'Player Player-current' : 'Player' }>
                {player.name}
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div>
        hang on...
      </div>
    )
  }
}

export default Players