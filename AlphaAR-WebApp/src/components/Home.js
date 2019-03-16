
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import fire from "../config/fire"
import Header from "../components/Header"
import { Jumbotron} from 'react-bootstrap';
import Home_nosession from "./Home_nosession"
import Home_session from "./Home_session"
import './Home.css'


class Home extends Component {

  constructor(props){
    super(props)
   
    this.state={
      teacherData:'',
      sessionRunning: false,
      sessionId:'',
      subjectId:'',
      term:'',
      week:'',
      modelName:'',
      uuid:''
    }
  }

  componentDidMount(){
    
    const db = fire.firestore();
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
         
        const teacherRef = db.collection("teachers").doc(user.uid);
        teacherRef.get().then(function(doc) {
          if (doc.exists) {
         
           
            this.setState({teacherData:doc.data(),uuid:user.uid});
           
            this.getSessionInfo(user.uid);
            
          } 
        }.bind(this));
        }else{
          console.log("dog shit 2")
        } 
    }); 
   
  }

  getSessionInfo(teacherId) { 
    var ref = fire.database().ref('sessions/' + teacherId)
    ref.once("value")
    .then(function(snapshot) {
    this.setState({sessionRunning: snapshot.exists()})
    if(snapshot.exists()){
        var modelId = snapshot.child("modelId").val()
        const subjectId = modelId.substring(0,7);
        const term = modelId.substring(7,9);
        const week = modelId.substring(9,11);
        const modelName = modelId.substring(11,modelId.length);
        this.setState({sessionId:snapshot.child("sessionId").val(),subjectId:subjectId,term:term,week:week,modelName:modelName}, function () {
            console.log(this.state.sessionId);
            console.log(this.state.modelId);});
           
    
       
    }
  }.bind(this));
    
    
       
    
}
   

  render() {

           
    return (
     
        <div>
          <Header fName={this.state.teacherData.firstName}/>
          <div id="nosessionView">
          {this.state.sessionRunning? <Home_session sessionId={this.state.sessionId} subjectId={this.state.subjectId} term={this.state.term} week={this.state.week} modelName={this.state.modelName} teacherData={this.state.teacherData}/> :<Home_nosession teacherData={this.state.teacherData}/>}
          
          </div>
        </div>
    )
  }
  };
  
  export default Home;