import React from "react";
import {Form, Tabs, Tab} from 'react-bootstrap'
import './CreateSession.css'


class CreateSession extends React.Component{


    render(){
        return(
            <div className='container'>
                <Tabs defaultActiveKey="subject" className='item'>
                    <Tab eventKey="subject" title="Subject">
                        <Form className='item'>
                            <Form.Group controlID= "exampleForm.ControlSelect1">
                                <Form.Label>Choose a Subject</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Tab>

                    <Tab eventKey="term" title="Term">
                        <Form className='item'>
                            <Form.Group controlID= "exampleForm.ControlSelect1">
                                <Form.Label>Choose a Term</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Tab>

                    <Tab eventKey="week" title="Week" disabled>
                        <Form className='item'>
                            <Form.Group controlID= "exampleForm.ControlSelect1">
                                <Form.Label>Choose a Week</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default CreateSession;