import React, { Component } from 'react';
import Prompt from './Prompt';
import Vote from './Vote';
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint = true;
var offsetLeft = 0;
var offsetTop = 0;

class PlayerMessages extends Component {
  render() {
    const playerId = this.props.playerId
    const winnerNames = this.props.game.winners.map(winner => { return winner.name})
    if (this.props.game.state === 'started' || this.props.game.state === 'final_question_opened') {
      return (<Prompt playerId={playerId}/>)
    } else if (this.props.game.state === 'voting_opened' || this.props.game.state === 'final_voting_opened') {
      return (<Vote playerId={playerId} game={this.props.game}/>)
    } else if (this.props.game.state === 'art') {
      return this._renderCanvas()
    } else if (this.props.game.state === 'finished') {
      return (winnerNames.length > 1 ? "Congrats to the winners, " : "Congrats to the winner, ") + winnerNames
    } else {
      return "Game will start soon...Maybe a join code goes here."
    }
  }

  _onMouseDown = (e) => {
    var mouseX = e.pageX - offsetLeft;
    var mouseY = e.pageY - offsetTop;

    paint = true;
    this.addClick(e.pageX - offsetLeft, e.pageY - offsetTop);
    this.redraw();
  }

  _onMouseMove = (e) => {
    if(paint){
      this.addClick(e.pageX - offsetLeft, e.pageY - offsetTop, true);
      this.redraw();
    }
  }

  _onMouseUp = (e) => {
    paint = false
  }

  redraw(){
    let context = document.getElementById('canvas').getContext("2d");

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i=0; i < clickX.length; i++) {
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
    }
  }

  addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  _renderCanvas() {
    return (
      <canvas id="canvas" style={{"backgroundColor": "white"}} onMouseDown={this._onMouseDown} onMouseUp={this._onMouseUp}  onMouseMove={this._onMouseMove}>

      </canvas>
    )

  }
}

export default PlayerMessages