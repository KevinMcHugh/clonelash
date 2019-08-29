import React, { Component } from 'react';
import Prompt from './Prompt';
import Vote from './Vote';

class PlayerMessages extends Component {
  render() {
    const playerId = this.props.playerId
    const winnerNames = this.props.game.winners.map(winner => { return winner.name})
    // TODO make everyone vote on responses simultaneously....
    if (this.props.game.state === 'started' || this.props.game.state === 'final_question_opened') {
      return (<Prompt playerId={playerId}/>)
    } else if (this.props.game.state === 'voting_opened' || this.props.game.state === 'final_voting_opened') {
      return (<Vote playerId={playerId} game={this.props.game}/>)
    } else if (this.props.game.state === 'finished') {
      return "Congrats to the winner, " + winnerNames
    } else {
      return "Game will start soon...Maybe a join code goes here."
    }
  }
}

export default PlayerMessages