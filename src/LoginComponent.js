import React, { Component } from 'react';

var profileObject = null;
class LoginComponent extends Component {
	constructor(props) {
    super(props);    
    this.state = {
      profileObject: {},
      isLoggedIn: false
    };
  }

  successResponseGoogle = (response) => {

  this.setState({
  	profileObject: response.profileObj
  });

}
    render() {

    return (
      <div className="Login">
        
        <div className="Login-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload ok.
        </p>
        
       {
       	this.state.isLoggedIn &&

       }
      </div>
    );


  }
}

export default LoginComponent
