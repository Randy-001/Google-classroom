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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function TeacherClass() {
    const { id } = useParams()
    const [classInfo, setClass] = useState('')
    const [test, setTest] = useState([])
    const history = useHistory()
    const navlist = [{ 'class': 'fa fa-plus', 'title': 'create new class', 'link': '/create' }]
    const Test = () => {
        history.push(`/${id}/test`)
    }
    const Assignment = () => {
        let x = alert('Not available');


    }
    const meet = (clscode) => {
        console.log(clscode)
        let x = prompt('Meet link')
        console.log("x-----------------------",x)
        if (x === '') {
            alert('Please enter valid string')
        }
        else if(x!==null){
          
            let link = { 'meetlink': x, 'classcode': clscode }
            fetch('/meet', {
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
                    if (data['data']['test'] != null) {
                        const t = Object.keys(data['data']['test'])
                        const index = t.indexOf('addd');
                        if (index > -1) {
                            t.splice(index, 1);
                        }
                        setTest(t)
                    }



                })

        }


    }
    const updateFn = (formCode, clscode) => {
        alert('Kindly add this email id surya-904@gsheet-demo-324513.iam.gserviceaccount.com to your spread sheet share option so we get an access to your spreadsheet')
        let x = prompt('Spreadsheet link')
        if(x!==null){
            x = x.split('/')
            let max = 0
            let maxStr = ''
            for (let i = 0; i < x.length; i++) {
                if (max < x[i].length) {
                    maxStr = x[i]
                    max = x[i].length
                }
    
            }
            let link = { 'id': maxStr, 'classcode': clscode, 'testcode': formCode }
            fetch('/spreadsheet', {
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
                    if (data['success']) {
                        alert('Students stream was updated successfully')
                    }
                    else {
                        alert('Error in updating students stream')
                    }
                })
    

        }
        else{
            alert('please enter valid spreadsheet link')
        }
       


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
                if (data['data']['test'] != null) {
                    const t = Object.keys(data['data']['test'])
                    const index = t.indexOf('addd');
                    if (index > -1) {
                        t.splice(index, 1);
                    }
                    setTest(t)
                }


                console.log(data)
                console.log(classInfo)

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
                                    {classInfo.meetlink !== 'Not available' ? <a className="class-card-link" target='_blank' href={classInfo.meetlink}>{classInfo.meetlink}</a> : <p className="class-card-link" onClick={() => { meet(classInfo.classcode) }}>Add meet link</p>}
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

                                        {test.length === 0 ? <h3 style={{ textAlign: 'center' }}>No tests posted yet</h3>:
                                            test.map(ele => {
                                                // return(<Card>{classInfo['test'][ele]['testlink']}</Card>)
                                                let date = new Date(classInfo['test'][ele]['duedate']).toString().slice(0, 15)
                                                return (

                                                    <Col id='test-cards' sm={12} key={ele} lg={8}>

                                                        <Card>

                                                            <Card.Body>

                                                                <Card.Title><span>{classInfo['test'][ele]['testname']}</span><span style={{ float: 'right' }}><button id='update-btn' onClick={() => { updateFn(ele, classInfo.classcode) }}>Update Score</button></span></Card.Title>
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
