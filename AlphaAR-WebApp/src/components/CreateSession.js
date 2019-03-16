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
        };

        this.handleChangeSubject = this.handleChangeSubject.bind(this);
        this.handleChangeTerm = this.handleChangeTerm.bind(this);
        this.handleChangeWeek = this.handleChangeWeek.bind(this);

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



    render(){
        return(
            <div className='container'>
                <Tabs defaultActiveKey="subject" className='tabItem'>
                    <Tab eventKey="subject" title="Subject">

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

                        <Button className='button'>Next</Button>

                    </Tab>

                    <Tab eventKey="term" title="Term" >
                        <Form className='item'>
                            <Form.Group controlID="exampleForm.ControlSelect1">
                                <Form.Label>Choose a Term</Form.Label>
                                <Form.Control as="select"
                                              onChange={this.handleChangeTerm}>
                                    <option key='1' value = "1">1</option>
                                    <option key='2' value = "2">2</option>
                                    <option key='3' value = "3">3</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                        <Button className='button'>Next</Button>
                    </Tab>

                    <Tab eventKey="week" title="Week" >
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


                        <Button className='button'>Create Session</Button>

                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default CreateSession;