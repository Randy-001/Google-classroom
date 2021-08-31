import React from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Navb from "../Navbar/Navb.js"
import cardimg from './class.svg'
import Cookies from 'universal-cookie';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useCookies } from 'react-cookie';


export default function StudentClass() {
    const { id } = useParams()
    const [classInfo, setClass] = useState('')
    const [test, setTest] = useState([])
    const [cookies, setCookie] = useCookies(['user']);
    const navlist = [{ 'class': 'fa fa-plus', 'title': 'join new class', 'link': '/join' }]
    const handin = (clscode) => {
        let data = {
            'classcode': id,
            'testcode': clscode

        }
        fetch('/handin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                if (data['success']) {
                    history.push(`/student/${id}`)
                }


            })
    }
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

                console.log(data)
                setClass(data['data'])
                if (data['data']['test'] != null) {
                    const t = Object.keys(data['data']['test'])
                    const index = t.indexOf('addd');
                    if (index > -1) {
                        t.splice(index, 1);
                    }
                    setTest(t)
                }



            })

    }, [])
    return (
        <div>
            <Navb list={navlist} />
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className='class-card-main'>
                            <div className="class-card">
                                <div className="class-card-name">
                                    <p>{classInfo.classname}</p>
                                    <p style={{ fontSize: 'medium' }}>{classInfo.classcode}</p>
                                    {classInfo.meetlink === 'Not available'?<p className="class-card-link">{classInfo.meetlink}</p>:<p className="class-card-link" onClick={()=>{window.location.href = `${classInfo.meetlink}`}}>{classInfo.meetlink}</p>}

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row id='tab-row'>

                    <Col lg={12}>
                        <div>
                            <Tabs>
                                <TabList>
                                    <Tab>Test</Tab>
                                    <Tab>Assignments</Tab>
                                </TabList>

                                <TabPanel>
                                    <Row id='test-cards-con'>
                                        {test ? <h3 style={{ textAlign: 'center' }}>No tests posted yet</h3>:
                                            test.map(ele => {
                                                // return(<Card>{classInfo['test'][ele]['testlink']}</Card>)
                                                let date = new Date(classInfo['test'][ele]['duedate']).toString().slice(0, 15)
                                                let currentDate = new Date();
                                                // console.log(currentDate<=new Date(classInfo['test'][ele]['duedate']))
                                                return (

                                                    <Col id='test-cards' sm={12} lg={8}>

                                                        <Card>

                                                            <Card.Body>

                                                                <Card.Title>{classInfo['test'][ele]['testname']} <span style={{ float: 'right' }}>{classInfo['test'][ele]['completed'][`${cookies.email}`]['marks']}</span></Card.Title>
                                                                <Card.Text><a href={classInfo['test'][ele]['testlink']}>{classInfo['test'][ele]['testlink']}</a></Card.Text>

                                                                <Card.Text>Due: {date}{classInfo['test'][ele]['completed'][`${cookies.email}`]['submissiondate'] === null ? <span style={{ float: 'right' }}>{currentDate <= new Date(classInfo['test'][ele]['duedate']) ? <button id='update-btn' onClick={() => { handin(ele) }}>Hand in</button> : null}</span> : <span id='completed'>Completed</span>}</Card.Text>


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
                                            <h3 style={{ textAlign: 'center' }}>No Assignments </h3>
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
