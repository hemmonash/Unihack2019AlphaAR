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

                      <td> {this.props.modelName} for {this.props.subjectName}, term {this.props.term}, week {this.props.week}</td>
                      <td>{this.props.timeRemaining}</td>

                    </tr>

                  </tbody>
                </Table>
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