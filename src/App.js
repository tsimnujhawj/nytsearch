import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header/Header"

class App extends Component {
  
  render() {
    const title = "TITLE HERE!!!"
    return (
      <Header changeTitle={this.changeTitle} title={title}/>
    );
  }
}

export default App;
