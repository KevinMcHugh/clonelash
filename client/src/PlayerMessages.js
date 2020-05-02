import React, { Component } from 'react';
import Prompt from './Prompt';
import Vote from './Vote';
import CanvasDraw from "react-canvas-draw";

class PlayerMessages extends Component {
  render() {
    const playerId = this.props.playerId
    const winnerNames = this.props.game.winners.map(winner => { return winner.name})
    if (this.props.game.state === 'started' || this.props.game.state === 'final_question_opened') {
      return (<Prompt playerId={playerId}/>)
    } else if (this.props.game.state === 'voting_opened' || this.props.game.state === 'final_voting_opened') {
      return (<Vote playerId={playerId} game={this.props.game}/>)
    } else if (this.props.game.state === 'finished') {
      return (winnerNames.length > 1 ? "Congrats to the winners, " : "Congrats to the winner, ") + winnerNames
    } else if (this.props.game.state === 'art') {
      return (<CanvasDraw onChange={() => console.log("onChange")} />);
    } else {
      return "Game will start soon...Maybe a join code goes here."
    }
  }
}

export default PlayerMessages