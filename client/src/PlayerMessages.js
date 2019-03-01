import React, { Component } from 'react';
import Prompt from './Prompt';
import Vote from './Vote';

class PlayerMessages extends Component {
  render() {
    const playerId = this.props.playerId
    if (this.props.game.state === 'started') {
      return (<Prompt playerId={playerId}/>)
    } else if (this.props.game.state === 'voting_opened') {
      return (<Vote playerId={playerId}/>)
    } else {
      return "Game will start soon...Maybe a join code goes here."
    }
  }
}

export default PlayerMessages