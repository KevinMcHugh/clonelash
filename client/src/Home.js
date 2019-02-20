import React, { Component } from 'react';
import logo from './logo.svg';
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
    axios.get('http://localhost:3001/games.json')
      .then(response => {
        console.log(response)
        this.setState({
          games: response.data
        })
    }).catch(error => console.log(error))
  }

  render() {
    console.log()
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
