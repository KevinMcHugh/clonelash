import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Home from './Home';
import Game from './Game';
import FourOhFour from './FourOhFour';

const PAGES = {
  undefined: Home,
  '/': Home,
  '/games': Game,
};

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }
  render() {

    const Handler = PAGES[this.props.pathname] || FourOhFour;
    console.log(this.props.pathname)
    return <Handler />;
  }
}

export default App;
