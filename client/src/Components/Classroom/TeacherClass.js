import React from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'

import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ClsNavbar from "../Navbar/ClsNavbar"
import cardimg from './class.svg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function TeacherClass() {
    const { id } = useParams()
    const [classInfo, setClass] = useState('')
    const [test, setTest] = useState([])
    const history = useHistory()
    const Test = () => {
        history.push(`/${id}/test`)
    }
    const Assignment = () => {
        let x = alert('Not available');
      
    }
    const meet=()=>{
        let x = prompt('Meet link')
        let link = {'link':x}
        fetch('/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(link)
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {


                setClass(data['data'])
                setTest(Object.keys(data['data']['test']))
                console.log(data)
                console.log(classInfo)

            })

    }
    useEffect(() => {
        let userData = {
            'classCode': id
        }
        fetch('/getData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {


                setClass(data['data'])
                setTest(Object.keys(data['data']['test']))
                console.log(data)
                console.log(classInfo)

            })

    }, [])
    return (
        <div>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className='class-card-main'>
                            <div className="class-card">
                                <div className="class-card-name">
                                    <p>{classInfo.classname}</p>
                                    <p style={{ fontSize: 'medium' }}>{classInfo.classcode}</p>
                                    <a className="class-card-link">{classInfo.meetlink ==='Not available' ? classInfo.meetlink : <a onClick={()=>{meet()}}>add meet link</a> }</a>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container>
                            <div class='btn-row'>
                                <button id='test-btn' onClick={() => { Test() }}>Test</button>
                                <button id='assignment-btn' onClick={() => { Assignment() }}>Assignment</button>

                            </div>


                        </Container>

                    </Col>
                </Row>
                <Row>

                    <Col lg={12}>
                        <div>
                            <Tabs>
                                <TabList>
                                    <Tab>Test</Tab>
                                    <Tab>Assignments</Tab>
                                </TabList>

                                <TabPanel>
                                    <Row id='test-cards-con'>
                                        {test &&
                                            test.map(ele => {
                                                // return(<Card>{classInfo['test'][ele]['testlink']}</Card>)
                                                let date = new Date(classInfo['test'][ele]['duedate']).toString().slice(0, 15)
                                                return (
                                                    
                                                        <Col id='test-cards' sm={12} lg={8}>
                                                            
                                                                <Card>

                                                                    <Card.Body>

                                                                        <Card.Title><span>Exam</span><span style={{float:'right'}}><button id='update-btn'>Update Score</button></span></Card.Title>
                                                                        <Card.Text>Due {date}</Card.Text>
                                                                        

                                                                    </Card.Body>

                                                                </Card>
                                                           
                                                        </Col>

                                                   


                                                )
                                            })
                                        }
                                    </Row>

                                </TabPanel>
                                <TabPanel>

                                    <Row id='test-cards-con'>
                                        <Col>
                                            <h3 style={{textAlign:'center'}}>No Assignments </h3>
                                        </Col>
                                    </Row>
                                </TabPanel>
                            </Tabs>

                        </div>

                    </Col>



                </Row>
            </Container>




        </div>
    )
}
