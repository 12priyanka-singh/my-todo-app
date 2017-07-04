import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import React from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
// import { Route, Redirect } from 'react-router'; 

class App extends Component {

  constructor(){
    super();
    this.state = {
      loggedIn: false,
      todoMap: {}
    };
  }

  errorResponseGoogle = (response) => {
      console.log(response);
  }

  successResponseGoogle = (response) => {
      this.setState(
          { 
              loggedIn : true,
              user : response.profileObj,
              email : response.profileObj.email
          }
        );
      console.log(response);
  }

  logout = () => {
      this.setState(
          {
            loggedIn: false
          }
        );
  }

  taskDone = (e) => {
    console.log("deleting " + e.target.id);
    var allUsersMap = this.state.todoMap;
    var myMap = allUsersMap[this.state.email];
    delete myMap[e.target.id];
    allUsersMap[this.state.email] = myMap;
    this.setState( {
        todoMap : allUsersMap
      }
    )
  }

  addTodo = () => {
      var text = document.getElementById("todoText").value
      document.getElementById("todoText").value = "";

      var emailId = this.state.email;
      var myTodoMap = this.state.todoMap;
      var list = this.state.todoMap[emailId];

      if(list) {
        var lastIndex = list['id'];
        lastIndex = lastIndex + 1;
        list[lastIndex] = text;
        list['id'] = lastIndex;
      } else {
        list = {};
        list['id'] = 1;
        list[1] = text;
      }

      myTodoMap[emailId] = list;

      this.setState({
        todoMap : myTodoMap
      });

      console.log(this.state.todoMap);
  }

 getArray() {
    var email = this.state.email;
    var map = this.state.todoMap[email];
    var listItems = [];
    if(map) {
      var n = map['id'];
      var i=1;
      for( ; i<=n; i++) {
        if(map[i]) 
          listItems.push( 
            <div style={{textAlign:"left"}}> 
              <li>{map[i]} 
                <button type="submit" id={i} onClick={this.taskDone}  style={{textAlign:"center"}}> Done </button> 
              </li> 
            </div>)
      }
    }
    return listItems;
  }
  
  render() {

    return (
      <div className="App">
        
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        
    
        {
          this.state.loggedIn ? 
            <div>
              <h3> Welcome {this.state.user.name}        
                <button type="submit" onClick={this.logout} style={{textAlign:"right"}} color="#2E8B57" >Log out</button>
              </h3> 

            
                <input type="text" name="todoText" id="todoText" placeholder="Title..." size="100" />
              

              <button type="submit" onClick={this.addTodo}>Add Todo</button> 
              {
                this.state.todoMap[this.state.email] && <ol type="1" > {this.getArray()} </ol>
              }
            </div>
            :
            <div>
              <h1></h1>
              <GoogleLogin 
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com" 
                  buttonText="Login" 
                  onSuccess={this.successResponseGoogle}
                  onFailure={this.errorResponseGoogle} >

                  <span> Login with Google</span>
              </GoogleLogin>
            </div>
          }
          
      </div>
    );


  }
}
export default App;


