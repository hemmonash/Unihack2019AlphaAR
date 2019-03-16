import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from "react-router-dom";
import Home from  "./components/Home";
import CreateSession from './components/CreateSession';
import Error from "./components/Error"
import Login from "./components/Login"
import Header from './components/Header';

import fire from "./config/fire"

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user:{}
    }
  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=> {
      if (user){
        this.setState({user});
      } else{
        this.setState({user:null});
      }
    })
  }
  render() {
 
    return (
      <BrowserRouter>
      <Switch>
      
       <Route path="/" component= {this.state.user ? (Home):(Login)} exact/>
       <Route path="/createsession" component={CreateSession}/>
       <Route component={Error}/>
       
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

//module.exports = App;
