import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import './Players.css';
import _ from 'lodash';

class Players extends Component {

  constructor(props){
    super(props)
    this.state = {
      players: [],
    }
  }

  componentDidMount() {
    axios.get('games/' + this.props.game_id + '/players')
      .then(response => {
        this.setState({
          players: response.data
        })
    }).catch(error => console.log(error))
  }

  handleReceivedPlayer = (response) => {
    if (response.message_type === 'Player') {
      let players = this.state.players;
      const playerIndex = _.findIndex(players, {id: response.id})
      if (playerIndex >=0) {
        let oldPlayer = players[playerIndex]
        if (oldPlayer.score != response.score) {
          response.scoreUpdated = oldPlayer.scoreUpdated ? oldPlayer.scoreUpdated + 1 : 1
        }
        players[playerIndex] = response
      } else {
        players.push(response)
      }

      this.setState({
        players
      });
    }
  };

  render() {
    const channel = { channel: 'GameChannel', id: this.props.game_id }
    const playerId = (this.props.player || {}).id
    const winnerIds = this.props.winners ? this.props.winners.map(winner => { return winner.id }) : []

    if (this.state.players.length > 0) {
      return (
        <div className='Player-container'>
          <ActionCableConsumer
            channel={channel}
            onReceived={this.handleReceivedPlayer} />
          {this.state.players.map (player => {
            let className = "Player"
            if (player.id === playerId) {
              className += " Player-current"
            }
            if (winnerIds.includes(player.id)) {
              className += " Player-winner"
            }
            if (player.scoreUpdated) {
              className += " Player-score-updated-" + player.scoreUpdated % 2
            }
            return (
              <div key={player.id} className={className}>
                {player.name}
                <div>
                  Score: {player.score}
                  <div className="Player-score" style={{
                    width: `${player.score * 10}px`,
                    transitionProperty: "width",
                    transitionDuration: `1.5s`,
                    transitionTimingFunction: "ease-out"}
                  }/>
                </div>
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