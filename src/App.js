import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header/Header"

class App extends Component {
  constructor(){
    super();
    this.state = {
        title: "This is the title here",
    }
}

changeTitle(title){
    this.setState({title})
  }

  render() {
    return (
      <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title}/>
    );
  }
}

export default App;
