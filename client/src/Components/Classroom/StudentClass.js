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

export default function StudentClass() {
    const { id } = useParams()
    const [classInfo, setClass] = useState('')
    const [test, setTest] = useState([])
    const history = useHistory()
    const Test = () => {
        history.push(`/${id}/test`)
    }
    const Assignment = () => {
        alert('Not available')
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
                                    <a className="class-card-link">Meeting link:https://meet.google.com/wey-xnbh-vvt</a>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <Row style={{marginTop:'50px'}}>

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

                                                                        <Card.Title>Exam</Card.Title>
                                                                        <Card.Text>{classInfo['test'][ele]['testlink']}</Card.Text>
                                                                        <Card.Text>Due {date}<span style={{float:'right'}}><button id='update-btn'>Hand in</button></span></Card.Text>
                                                                        

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
