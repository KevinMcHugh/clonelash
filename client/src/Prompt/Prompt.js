import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import _ from 'lodash';
import Canvas from './Canvas';
import './Prompt.css';

class Prompt extends Component {

  constructor(props){
    super(props)
    this.state = {
      prompts: null
    }
  }

  componentDidMount() {
    axios.get('players/' + this.props.playerId + '/prompts')
      .then(response => {
        this.setState({
          prompts: response.data,
        })
    }).catch(error => console.log(error))
  }

  handleReceivedPlayerMessage = (response) => {
    if (response.message_type === 'Response') {
      let prompts = this.state.prompts;
      if (!prompts.some(p => p.id === response.id)) {
        prompts.push(response)
      }
      this.setState({
        prompts
      });
    }
  }

  render() {
    const playerId = this.props.playerId
    const channel = { channel: 'PlayerChannel', id: playerId }

    if (this.state.prompts === null) {
      return (<div>hang on...</div>)
    } else if (_.isEmpty(this.state.prompts)) {
      return (<div>Wait for other players...</div>)
    }
    if (!_.isEmpty(this.state.prompts)) {
      return (
        <div className="Prompt">
          <ActionCableConsumer
            channel={channel}
            onReceived={this.handleReceivedPlayerMessage} />
          { this._renderPrompt() }
        </div>
      )
    }
  }

  _onSubmit = (e,messageId) => {
    e.preventDefault()
    const text = e.target.elements[0].value
    e.target.elements[0].value = ''
    axios.put('responses/' + messageId,
      {text: text})
      .then(response => {
        let prompts = this.state.prompts
        _.remove(prompts, {id: response.data.id})
        this.setState({
          prompts
        })
    }).catch(error => console.log(error))
  }

  _renderPrompt() {
    const prompt = _.first(this.state.prompts)
    if (prompt && prompt.game_prompt.format === 'art') {
      return (
        <Canvas />
      );
    } else if (prompt) {
      return (
        <div>
          <div> Answer this question: </div>
          {prompt.game_prompt.text}
          {this._renderForm(prompt)}
        </div>
      )
    }
  }

  _renderMessage(prompt) {
    return (
      <div>
        <div> Answer this question: </div>
        {prompt.game_prompt.text}
        {this._renderForm(prompt)}
      </div>
    )
  }

  _renderForm(prompt) {
    if (prompt.id) {
      return (
        <form onSubmit={(e) => this._onSubmit(e,prompt.id)}>
          <input name="text" autoComplete="off" maxLength={30}/>
          <button>OK</button>
        </form>
      )
    }
  }
}

export default Prompt