import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {

  constructor(props){
    super(props)
  }

  _addAPlayer = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/admin/add_player',
      {game_id: this.props.game_id}
    ).catch(error => console.log(error))
  }

  render() {

    return (
      <div>
        <button onClick={this._addAPlayer}>Add a player.</button>
      </div>
    )
  }
}

export default Admin