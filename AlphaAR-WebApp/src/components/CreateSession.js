import React from "react";
import {Form, Tabs, Tab, ButtonToolbar, Button} from 'react-bootstrap';
import './CreateSession.css';
import fire from "../config/fire";

function OptionsSubject(props) {
    var subjects = ["y07sci01", "y08sci01"];

    return (
        <Form className='item'>
            <Form.Group controlID="exampleForm.ControlSelect1">
                <Form.Label>Choose a Subject</Form.Label>
                <Form.Control as="select"
                              onChange={props.onSelect}>
                    {subjects.map(function (name) {
                        return (
                            <option key={name} value={name}>{name}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )
}


function OptionsTerm(props){
    var terms = ['01','02','03','04'];

    return(
        <Form className='item'>
            <Form.Group controlID="exampleForm.ControlSelect1">
                <Form.Label>Choose a Term</Form.Label>
                <Form.Control as="select"
                              onChange={props.onSelect}>
                    {terms.map(function (term) {
                        return (
                            <option key={term} value={term}>{term}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

function OptionsWeek(props){
    var weeks = ['01','02','03','04','05','06','07','08','09','10','11','12'];

    return(
        <Form className='item'>
            <Form.Group controlID="exampleForm.ControlSelect1">
                <Form.Label>Choose a Term</Form.Label>
                <Form.Control as="select"
                              onChange={props.onSelect}>
                    {weeks.map(function (week) {
                        return (
                            <option key={week} value={week}>{week}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

function OptionsModel(props){
    //TODO: Show Models based on teachers
    var model = ["cell"];

    return(
        <Form className='item'>
            <Form.Group controlID="exampleForm.ControlSelect1">
                <Form.Label>Choose a Term</Form.Label>
                <Form.Control as="select"
                              onChange={props.onSelect}>
                    {model.map(function (model) {
                        return (
                            <option key={model} value={model}>{model}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

//
// function Option

class CreateSession extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            subject: "y07sci01",
            term: "01",
            week: "01",
            tab: "subject",
            model: "cell",
            subjects: []
        };


        this.handleChangeSubject = this.handleChangeSubject.bind(this);
        this.handleChangeTerm = this.handleChangeTerm.bind(this);
        this.handleChangeWeek = this.handleChangeWeek.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.firebasestuff = this.firebasestuff.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
    }

    componentDidMount(){
        this.firebasestuff()
    }

    firebasestuff(){

        var db = fire.firestore();

        var list = ["Year 7 Science"];
        db.collection("subjects").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                // console.log(doc.data().subjectName);
                list.push(doc.data().subjectName);

            })
        });
        this.setState({ subjects: list});
    }


    handleChangeSubject(e) {
        this.setState({ subject: e.target.value });
    };

    handleChangeTerm(e) {
        this.setState({ term: e.target.value });
    };

    handleChangeWeek(e) {
        this.setState({ week: e.target.value });
    };

    handleChangeModel(e){
        this.setState({ model: e.target.value });
    };

    handleTab(e) {
        this.setState({tab: e});
    }

    handleCreate(){
        var db = fire.firestore();
    }



    render(){
        return(
            <div className='container1'>
                <div className='container rounded'>

                    <Tabs activeKey={this.state.tab} className='tabItem'>
                        <Tab eventKey="subject" title="Subject" disabled>

                            <OptionsSubject subjects={this.state.subjects} onSelect={this.handleChangeSubject}/>


                            <Button className='button' onClick={() => this.handleTab("term")}>Next</Button>
                        </Tab>

                        <Tab eventKey="term" title="Term" disabled>

                            <OptionsTerm onSelect={this.handleChangeTerm}/>

                            <Button className='button' onClick={() => this.handleTab("subject")}>Back</Button>
                            <Button className='button' onClick={() => this.handleTab("week")}>Next</Button>

                        </Tab>

                        <Tab eventKey="week" title="Week" disabled>

                            <OptionsWeek subjects={this.state.subjects} onSelect={this.handleChangeWeek}/>

                            <Button className='button' onClick={() => this.handleTab("term")}>Back</Button>
                            <Button className='button' onClick={() => this.handleTab("model")}>Next</Button>

                        </Tab>

                        <Tab eventKey="model" title="Model" disabled>

                            <OptionsModel subjects={this.state.subjects} onSelect={this.handleChangeModel}/>

                            <p>{this.state.subject}{this.state.term}{this.state.week}{this.state.model}</p>

                            <Button className='button' onClick={() => this.handleTab("week")}>Back</Button>
                            <Button className='button' onClick={() => this.handleCreate}>Create Session</Button>
                        </Tab>


                    </Tabs>
                </div>
            </div>
        )
    }
}

export default CreateSession;