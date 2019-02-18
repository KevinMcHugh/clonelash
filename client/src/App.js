import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/games.json')
      .then(response => {
        console.log(response)
        this.setState({
          games: response.data
        })
    }).catch(error => console.log(error))
  }

  _onClick(gameId) {
    console.log(gameId)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Stink Buttsmell

          {this.state.games.map (game => {
            return (<button key={game.id} onClick={(e) => this._onClick(game.id, e)}>{game.id}</button>)
          })}

        </header>
      </div>
    );
  }
}

export default App;
