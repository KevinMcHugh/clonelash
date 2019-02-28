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
          { this._renderMessage() }
        </div>
      )
    }
  }

  _onSubmit = (e,messageId) => {
    e.preventDefault()
    const text = e.target.elements[0].value
    axios.put('http://localhost:3001/responses/' + messageId,
      {text: text})
      .then(response => {
        let prompts = this.state.prompts
        _.remove(prompts, {id: response.data.id})
        this.setState({
          prompts
        })
    }).catch(error => console.log(error))
  }

  _renderMessage() {
    const message = _.first(this.state.responsesToVoteOn)
    if (message) {
      return (
        <div>
          vote now: {message.game_prompt.text}
          <div>{ this._renderResponses(message) }</div>
        </div>
      )
    }
  }

  _renderResponses(message) {
    return message.responses.map((response) => {
      return (<button key={response.id}>{response.text}</button>)
    })
  }
}

export default Vote