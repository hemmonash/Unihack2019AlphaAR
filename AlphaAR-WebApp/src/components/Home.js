
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import fire from "../config/fire"
import Header from "../components/Header"
import { Jumbotron} from 'react-bootstrap';
import Home_nosession from "./Home_nosession"
class Home extends Component {

  constructor(props){
    super(props)
   
    this.state={
      teacherData:''
    }
  }

  componentDidMount(){
    
    const db = fire.firestore();
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const teacherRef = db.collection("teachers").doc(user.uid);
        teacherRef.get().then(function(doc) {
          if (doc.exists) {
          console.log("works")
           
           this.setState({teacherData:doc.data()}, function () {
            console.log(this.state.teacherData );})
           
          } 
        }.bind(this));
        }else{
          console.log("dog shit 2")
        }
    });
   
  }
  render() {
    
    
    return (
     
        <div>
          <Header fName={this.state.teacherData.firstName}/>
          <h1>{this.state.teacherData.firstName}</h1>
          <Home_nosession/>
        </div>
    )
  }
  };
  
  export default Home;