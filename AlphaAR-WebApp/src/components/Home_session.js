import React,{Component} from 'react';
import { Jumbotron, Button, Table} from 'react-bootstrap';
import './Home_session.css'
import fire from '../config/fire'
class Home_session extends Component {
    constructor(props){
        super(props);
       
      }
  stopSession(e){
    console.log('ff')
    e.preventDefault();
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            var sessionRef = fire.database().ref('sessions/' + user.uid)
            sessionRef.remove()
            window.location.href="/"
        }
    });
   
   
  }
render(){

    return(
       
      
        <div className='container1'>

            <div className="container rounded">
                <Table className="table table-striped">
                  <thead>
                    <tr>

                      <th>Session Detail</th>
                      <th>Time Remaining</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                     <td> {this.props.modelName} for {this.props.subjectName}, Term {this.props.term}, Week {this.props.week}</td>
                      <td>{this.props.timeRemaining}</td>

                    </tr>

                  </tbody>
                </Table>
                <h6>Session ID</h6>
                <h1>{this.props.sessionId}</h1>
                <div className='container2'>
                    <Button variant="primary" onClick={this.stopSession}>Stop Session</Button>
                </div>
            </div>
        </div>
        
    )
}

}
export default Home_session;
//  <