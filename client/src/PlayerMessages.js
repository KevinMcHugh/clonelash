import React, { Component } from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import _ from 'lodash';
import Prompt from './Prompt';
import Vote from './Vote';

class PlayerMessages extends Component {
  render() {
    const playerId = this.props.playerId
    const channel = { channel: 'PlayerChannel', id: playerId }
    if (this.props.game.state === 'started') {
      return (<Prompt playerId={playerId}/>)
    } else if (this.props.game.state === 'voting_opened') {
      return (<Vote playerId={playerId}/>)
    }
  }
}

export default PlayerMessages