import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';
import _ from 'lodash';

class PlayerMessages extends Component {

  constructor(props){
    super(props)
    this.state = {
      prompts: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/players/' + this.props.playerId + '/prompts')
      .then(response => {
        this.setState({
          prompts: response.data
        })
    }).catch(error => console.log(error))
  }

  handleReceivedPlayerMessage = (response) => {
    if (response.message_type == 'Response') {
      let prompts = this.state.prompts;
      if (!prompts.some(p => p.id === response.id)) {
        prompts.push(response)
      }
      this.setState({
        prompts
      });
    }
  };

  render() {
    const playerId = this.props.playerId
    const channel = { channel: 'PlayerChannel', id: playerId }
    if (this.state.prompts) {
      return (
        <div>
          <ActionCableConsumer
            channel={channel}
            onReceived={this.handleReceivedPlayerMessage} />
          { this._renderMessage() }
        </div>
      )
    }

    return (
      <div>
        hang on...
      </div>
    )
  }

  _onSubmit = (e) => {
    e.preventDefault()
    const text = e.target.elements[0].value
    axios.put('http://localhost:3001/responses',
      {game_id: this.props.params.id, name: name})
      .then(response => {
        this.setState({
          player: response.data,
        })
    }).catch(error => console.log(error))
  }

  _renderMessage() {
    const message = _.first(this.state.prompts)
    if (message) {
      return (
        <div>
          Answer this question: {message.game_prompt.text}
          <form onSubmit={this._onSubmit}>
            <input name="name" />
            <button>OK</button>
          </form>
        </div>
      )
    }
  }
}

export default PlayerMessages