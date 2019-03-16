import React,{Component} from 'react';
import { Jumbotron, Button, Table} from 'react-bootstrap';
import './Home_session.css'
class Home_session extends Component {
    constructor(props){
        super(props);
       
        this.state={
          
        }
      }
      componentWillMount(){
         
        var uuid = this.props.uuid;
        console.log(uuid);
        
          
  
      }
render(){

    return(
        <div className='container1'>

            <div className="container">
                <Table className="table table-striped">
                  <thead>
                    <tr>

                      <th>Session Detail</th>
                      <th>Time Remaining</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td> {this.props.subjectId}{this.props.term}{this.props.week}{this.props.modelName}</td>
                      <td>29 min</td>

                    </tr>

                  </tbody>
                </Table>
                <div className='container2'>
                    <Button variant="primary">Stop Session</Button>
                </div>
            </div>
        </div>
        
    )
}

}
export default Home_session;
//  <