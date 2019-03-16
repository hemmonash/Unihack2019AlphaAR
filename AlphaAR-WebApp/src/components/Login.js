import React, { Component } from 'react';
import { Form, Button, Nav, Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';
import fire from '../config/fire'
import './Login.css'




class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:'',
            password:''
        }
    }

    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error)=>{
            console.log(error);
        });
    }

 handleChange(e) {
   this.setState({[e.target.name]: e.target.value});
 }
    render() {
      return (
        <div class="backg ">
            <div class="jumbotron vertical-center container-fluid">
                <div class="container text-center">
                    <form>
                        <img
                            src=" https://image.flaticon.com/icons/svg/1057/1057585.svg"
                            width="80"
                            height="80"
                          />
                        <br></br>
                        <h2>Alpha AR</h2>
                        <br></br>

                        <div class="form-group">
                            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>

                        <div class="form-group">
                            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                       </div>

                       <br></br>

                       <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
                       <Nav.Link href="https://google.com" class="nav-c">Forgot Password?</Nav.Link>
                     </form>
                </div>
            </div>
        </div>

      )
    }
}

export default Login;

