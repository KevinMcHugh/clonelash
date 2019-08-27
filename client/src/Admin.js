import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {

  _startGame = (e) => {
    e.preventDefault()
    axios.put('games/' + this.props.game_id,
      {game: { state: 'started'}})
      .then(response => {
        this.setState({
          game: response.data,
        })
    }).catch(error => console.log(error))
  }

  _addAPlayer = (e) => {
    e.preventDefault()
    axios.post('admin/add_player',
      {game_id: this.props.game_id}
    ).catch(error => console.log(error))
  }

  _answerQuestions = (e) => {
    e.preventDefault()
    axios.post('admin/answer_questions',
      {game_id: this.props.game_id}
    ).catch(error => console.log(error))
  }

  _cancelGame = (e) => {
    e.preventDefault()
    axios.put('games/' + this.props.game_id,
      {game: { state: 'canceled'}})
      .then(response => {
        this.setState({
          game: response.data,
        })
    }).catch(error => console.log(error))
  }

  _completeVotes = (e) => {
    e.preventDefault()
    axios.post('admin/complete_votes',
      {game_id: this.props.game_id}
    ).catch(error => console.log(error))
  }

  render() {
    // All this shit seems to break sockets...
    if (this.props.player && this.props.player.admin) {
      return (
        <div>
          <button onClick={this._startGame}>Start the game now!</button>
          <button onClick={this._addAPlayer}>Add a player.</button>
          <button onClick={this._answerQuestions}>Answer all questions.</button>
          <button onClick={this._completeVotes}>Complete all votes.</button>
          <button onClick={this._cancelGame}>Cancel the game now!</button>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Admin
