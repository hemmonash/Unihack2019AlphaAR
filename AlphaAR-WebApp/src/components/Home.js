
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
      uuid:'',
      subjectName:'',
     timeRemaining:''
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
        var modelId = snapshot.child("modelId").val();
        var dateTime = snapshot.child("dateTime").val();
        const currentDate = Date.now();
        console.log("current time:"+currentDate)
        var timeRemaining = 1800000 - (currentDate - dateTime);
       timeRemaining =  Math.floor(timeRemaining* 0.00001667)
        const subjectId = modelId.substring(0,8);
        const term = modelId.substring(8,10);
        const week = modelId.substring(10,12);
        const modelName = modelId.substring(12,modelId.length);
        this.setState({sessionId:snapshot.child("sessionId").val(),subjectId:subjectId,term:term,week:week,modelName:modelName, timeRemaining:timeRemaining}, function () {
            console.log(this.state.sessionId);
            console.log(this.state.timeRemaining);
            console.log(this.state.modelId);});
            
            const db = fire.firestore();
            fire.auth().onAuthStateChanged((user) => {
              if (user) {
                  console.log(this.state.subjectId)
                  const subjectRef = db.collection("subjects").doc(this.state.subjectId);
                  subjectRef.get().then(function(doc) {
                      if (doc.exists) {
                          this.setState({subjectName:doc.data().subjectName}, function () {
                              console.log("subjectName: "  + this.state.subjectName)
                          });
                      }
                }.bind(this));
              }
            });
    }
  }.bind(this));
    
  
    
       
    
}
  
   

  render() {

           
    return (
     
        <div>
          <Header fName={this.state.teacherData.firstName}/>
          <div id="nosessionView">
          {this.state.sessionRunning? <Home_session sessionId={this.state.sessionId} subjectName={this.state.subjectName} timeRemaining={this.state.timeRemaining} subjectId={this.state.subjectId} term={this.state.term} week={this.state.week} modelName={this.state.modelName} teacherData={this.state.teacherData}/> :<Home_nosession teacherData={this.state.teacherData}/>}
          
          </div>
        </div>
    )
  }
  };
  
  export default Home;