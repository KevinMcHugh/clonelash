import React, { Component } from 'react';
import Prompt from './Prompt';
import Vote from './Vote';

class PlayerMessages extends Component {
  render() {
    const playerId = this.props.playerId
    // TODO make everyone vote on responses simultaneously....
    if (this.props.game.state === 'started') {
      return (<Prompt playerId={playerId}/>)
    } else if (this.props.game.state === 'voting_opened') {
      return (<Vote playerId={playerId}/>)
    } else if (this.props.game.state === 'voting_closed') {
      return "Get ready for the final question..."
    } else {
      return "Game will start soon...Maybe a join code goes here."
    }
  }
}

export default PlayerMessages