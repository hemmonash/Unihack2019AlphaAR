import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {  Navbar } from 'react-bootstrap';
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
        
      </Navbar>
    )
  }
  }; 
  
  export default Header;