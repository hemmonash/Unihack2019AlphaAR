import React,{Component} from 'react';
import { Jumbotron, Button} from 'react-bootstrap';
import './Home_nosession.css'
class Home_nosession extends Component {
render(){
    return(
        <div class="jumbotron vertical-center container-fluid" id="cont1">
            <div class="container text-center" id="cont">

                <h3>There is currently no session running.</h3>
                <br></br>
                <Button variant="primary">Create Session</Button>

            </div>
        </div>
    )
}

}
export default Home_nosession;
