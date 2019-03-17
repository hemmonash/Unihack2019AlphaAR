import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {  Navbar, Button } from 'react-bootstrap';
import './Header.css'
import fire from '../config/fire'

class Header extends Component {
    logout(e){
        fire.auth().signOut().then(function() {
             window.location.href="/"
          }, function(error) {
            // An error happened.
          }.bind(this));
    }
  render() {
    return (
   
        <Navbar variant="dark" className="navClass">
        <Navbar.Brand href="">
          <img 
        
            alt=""
            src="https://i.ibb.co/QHkgRJ6/alpha-AR-white-circle-only.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
           
          />
          {this.props.title}
          
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        Hi, <a href="" onClick={this.logout}>{this.props.fName} ▼ </a> 
    </Navbar.Text>
    </Navbar.Collapse>
      </Navbar>
      
    )
  }
  }; 
  
  export default Header;