import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {  Navbar, Button } from 'react-bootstrap';
import './Header.css'


class Header extends Component {

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
          {'  Manage Session'}
          
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
      Hi, <a href="logOut">{this.props.fName} ▼ </a>
    </Navbar.Text>
    </Navbar.Collapse>
      </Navbar>
      
    )
  }
  }; 
  
  export default Header;