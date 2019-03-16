import React,{Component} from 'react';
import { Jumbotron, Button} from 'react-bootstrap';
import './Home_nosession.css'
class Home_nosession extends Component {
    render() {
        return (
            <div class="jumbotron vertical-center container-fluid" id="cont1">
                <div class="container text-center" id="cont">

                    <h5>There is currently no session running.</h5>
                    <br></br>
                    <img
                        src="https://i.ibb.co/ySrzGsT/startup-1.png"
                        width="60"
                    />
                    <br></br>
                    <br></br>
                    <Button variant="primary" href="/createsession" >Create Session</Button>

                </div>
            </div>
        )
    }
}

export default Home_nosession;
