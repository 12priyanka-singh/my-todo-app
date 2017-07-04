import React, { Component } from 'react';

class GoogleLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this._onButtonClick}>Button</Button>
        {this.state.showComponent ?
           <NewComponent /> :
           null
        }
      </div>
    );
  }
}