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
        <div class="jumbotron vertical-center container-fluid" id="cont1">
        
        
        <Table class="table table-striped">
  <thead>
    <tr>
      
      <th>Session Detail</th>
      <th>Time Remaining</th>
     
    </tr>
  </thead>
  <tbody>
    <tr>
    
      <td> {this.props.modelName} for {this.props.subjectName}, term {this.props.term}, week {this.props.week}</td>
      <td>{this.props.timeRemaining} min </td>
     
    </tr>
   
  </tbody>
</Table>
            <br></br>
            
          <Button variant="primary">Stop Session</Button>
      
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