import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  componentWillMount() {
    axios.get('api/games.json')
      .then(response => {
        this.setState({
          games: response.data
        })
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Stink Buttsmell

          {this.state.games.map (game => {
            return (<a key={game.id} href={"/games/" + game.id }> {game.id} </a>)
          })}

        </header>
      </div>
    );
  }
}

export default Home;
