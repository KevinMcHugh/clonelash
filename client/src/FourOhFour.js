import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          Nothing here.
        </header>
      </div>
    );
  }
}

export default Home;
