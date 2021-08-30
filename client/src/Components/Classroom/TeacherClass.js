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
    const meet=(clscode)=>{
        console.log(clscode)
        let x = prompt('Meet link')
        let link = {'meetlink':x,'classcode':clscode}
        fetch('/meet',{
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
                console.log(data)
                setClass(data['success'])
                if(data['success']['test']!=null){
                    setTest(Object.keys(data['success']['test']))
                }

                

            })

    }
    const updateFn=(formCode,clscode)=>{
        let x = prompt('Spreadsheet link')
        x = x.split('/')
        let max = 0
        let maxStr = ''
        for(let i = 0;i<x.length;i++){
            if(max<x[i].length){
                maxStr = x[i]
                max = x[i].length
            }

        }
        let link = {'id':maxStr,'classcode':clscode,'testcode':formCode}
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


                
                console.log(data)
                

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
                if(data['data']['test']!= null){
                    setTest(Object.keys(data['data']['test']))
                }
                
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
                                    {classInfo.meetlink !=='Not available' ? <a className="class-card-link" target='_blank' href = {classInfo.meetlink}>{classInfo.meetlink}</a> : <a onClick={()=>{meet(classInfo.classcode)}}>add meet link</a> }
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
                                                    
                                                        <Col id='test-cards' sm={12} key = {ele} lg={8}>
                                                            
                                                                <Card>

                                                                    <Card.Body>

                                                                        <Card.Title><span>Exam</span><span style={{float:'right'}}><button id='update-btn' onClick = {()=>{updateFn(ele,classInfo.classcode)}}>Update Score</button></span></Card.Title>
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
