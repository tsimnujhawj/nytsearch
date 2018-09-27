import React, { Component } from 'react';

class Header extends Component {
    constructor(){
        super();
        this.state = {
            title: "This is the title",
            stuff: [{
                name: "alex"
            }]
        }
    }

    changeTitle(title){
        this.setState({title})
    }
  render() {
    console.log(this.props)
    return (
      <div className="container">
        <h1>{this.state.title}</h1>
        <h1>{this.state.stuff[0].name}</h1>
        <h1>{this.props.title}</h1>
        <input />
      </div>
    );
  }
}

export default Header;
