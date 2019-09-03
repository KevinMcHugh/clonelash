import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import _ from 'lodash';
import './Vote.css';

class Vote extends Component {

  constructor(props){
    super(props)
    this.state = {
      gamePrompt: null
    }
  }

  _getCurrentGamePrompt = () => {
    axios.get('players/' + this.props.playerId + '/current_game_prompt')
      .then(response => {
        this.setState({
          gamePrompt: response.data,
        })
    }).catch(error => console.log(error))
  }

  componentDidMount() {
    this._getCurrentGamePrompt()
  }

  handleReceivedPlayerMessage = (response) => {
    if (response.message_type === 'GamePrompt') {
      this.setState({gamePrompt: response})
    }
  }

  render() {
    const playerId = this.props.playerId
    const channel = { channel: 'PlayerChannel', id: playerId }

    if (this.state.gamePrompt === null) {
      return (<div>hang on...</div>)
    } else if (_.isEmpty(this.state.gamePrompt)) {
      return (<div>Wait for other players...</div>)
    } else {
      return (
        <div className="Vote">
          <ActionCableConsumer
            channel={channel}
            onReceived={this.handleReceivedPlayerMessage} />
          { this._renderVote() }
        </div>
      )
    }
  }

  _onClick = (e,responseId) => {
    axios.post('votes',
      {response_id: responseId, player_id: this.props.playerId, game_prompt_id: this.state.gamePrompt.id})
      .then(response => {
        this._getCurrentGamePrompt()
    }).catch(error => console.log(error))
  }

  _renderVote() {
    const gamePrompt = this.state.gamePrompt
    if (gamePrompt) {
      return (
        <div>
          <div>vote now:</div>
          {gamePrompt.text}
          <div>{ this._renderResponses(gamePrompt) }</div>
        </div>
      )
    }
  }

  _renderResponses(vote) {
    return vote.responses.map((response) => {
      return (
        <button key={response.id} onClick={(e) => this._onClick(e,response.id)} disabled={!response.selectable} >
          {response.text}
        </button>
      )
    })
  }
}

export default Vote