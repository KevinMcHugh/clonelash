import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import _ from 'lodash';

class Vote extends Component {

  constructor(props){
    super(props)
    this.state = {
      responsesToVoteOn: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/votes',
      { params: { player_id: this.props.playerId, foo: 'bar' }})
      .then(response => {
        this.setState({
          responsesToVoteOn: response.data,
        })
    }).catch(error => console.log(error))
  }

  handleReceivedPlayerMessage = (response) => {
    if (response.message_type === 'Vote') {
      let responsesToVoteOn = this.state.responsesToVoteOn;
      if (!responsesToVoteOn.some(p => p.id === response.id)) {
        responsesToVoteOn.push(response)
      }
      this.setState({
        responsesToVoteOn
      })
    }
  }

  render() {
    const playerId = this.props.playerId
    const channel = { channel: 'PlayerChannel', id: playerId }

    if (this.state.prompts === null) {
      return (<div>hang on...</div>)
    } else if (_.isEmpty(this.state.responsesToVoteOn)) {
      return (<div>Wait for other players...</div>)
    } else {
      return (
        <div>
          <ActionCableConsumer
            channel={channel}
            onReceived={this.handleReceivedPlayerMessage} />
          { this._renderVote() }
        </div>
      )
    }
  }

  _onClick = (e,voteId,responseId) => {
    // e.preventDefault()
    axios.put('http://localhost:3001/votes/' + voteId,
      {response_id: responseId})
      .then(response => {
        // actually probably want to leave this up while votes roll in...
        let responsesToVoteOn = this.state.responsesToVoteOn
        _.remove(responsesToVoteOn, {id: response.data.id})
        this.setState({
          responsesToVoteOn
        })
    }).catch(error => console.log(error))
  }

  _renderVote() {
    const vote = _.first(this.state.responsesToVoteOn)
    if (vote) {
      return (
        <div>
          vote now: {vote.game_prompt.text}
          <div>{ this._renderResponses(vote) }</div>
        </div>
      )
    }
  }

  _renderResponses(vote) {
    return vote.responses.map((response) => {
      return (
        <button key={response.id} onClick={(e) => this._onClick(e,vote.id,response.id)}>
          {response.text}
        </button>
      )
    })
  }
}

export default Vote