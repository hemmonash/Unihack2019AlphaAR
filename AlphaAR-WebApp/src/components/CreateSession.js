import React from "react";
import {Form, Tabs, Tab, ButtonToolbar, Button} from 'react-bootstrap'
import './CreateSession.css'


class CreateSession extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            subject: 1,
            term: 1,
            week: 1,
            tab: "subject"
        };

        this.handleChangeSubject = this.handleChangeSubject.bind(this);
        this.handleChangeTerm = this.handleChangeTerm.bind(this);
        this.handleChangeWeek = this.handleChangeWeek.bind(this);
        this.handleTab = this.handleTab.bind(this);
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

    handleTab(e) {
        this.setState({tab: e});
    }



    render(){
        return(
            <div className='container'>
                <Tabs activeKey={this.state.tab} className='tabItem' >
                    <Tab eventKey="subject" title="Subject" disabled>

                        <Form className='item'>
                            <Form.Group controlID= "exampleForm.ControlSelect1">
                                <Form.Label>Choose a Subject</Form.Label>
                                <Form.Control as="select"
                                              onChange={this.handleChangeSubject}>
                                    <option key='1' value = "1">1</option>
                                    <option key='2' value = "2">2</option>
                                    <option key='3' value = "3">3</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                        <Button className='button' onClick={()=>this.handleTab("term")}>Next</Button>


                    </Tab>

                    <Tab eventKey="term" title="Term" disabled>
                        <Form className='item'>
                            <Form.Group controlID="exampleForm.ControlSelect1" >
                                <Form.Label>Choose a Term</Form.Label>
                                <Form.Control as="select"
                                              onChange={this.handleChangeTerm}>
                                    <option key='1' value = "1">1</option>
                                    <option key='2' value = "2">2</option>
                                    <option key='3' value = "3">3</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                        <Button className='button' onClick={()=>this.handleTab("subject")}>Back</Button>
                        <Button className='button' onClick={()=>this.handleTab("week")}>Next</Button>

                    </Tab>

                    <Tab eventKey="week" title="Week" disabled>
                        <Form className='item'>
                            <Form.Group controlID= "exampleForm.ControlSelect1">
                                <Form.Label>Choose a Week</Form.Label>
                                <Form.Control as = "select"
                                              onChange={this.handleChangeWeek}>
                                    <option key='1' value = "1">1</option>
                                    <option key='2' value = "2">2</option>
                                    <option key='3' value = "3">3</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                        <p>{this.state.subject}</p>
                        <p>{this.state.term}</p>
                        <p>{this.state.week}</p>

                        <Button className='button' onClick={()=>this.handleTab("term")}>Back</Button>
                        <Button className='button'>Create Session</Button>

                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default CreateSession;