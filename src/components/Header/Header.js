import React, { Component } from 'react';

class Header extends Component {

    handleChange(e) {
        const title = e.target.value;
        this.props.changeTitle(title);
    }

  render() {
    return (
      
    <div>
        
        <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1 className="display-4">Fluid jumbotron</h1>
            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
        </div>

        <div className="container">
            <h1>{this.props.title}</h1>
            <input value={this.props.title} onChange={this.handleChange.bind(this)}/>
        </div>

    </div>
    );
  }
}

export default Header;
