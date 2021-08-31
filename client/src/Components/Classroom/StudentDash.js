import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from "react-router-dom";
import Navb from "../Navbar/Navb.js"
import cardimg from './cardimg2.svg'

export default function StudentDash() {
    const history = useHistory()
    const [data, setData] = useState([])
    const navlist = [{'class':'fa fa-plus','title':'join new class','link':'/join'}]
    useEffect(()=>{
        fetch('/studentdashboard',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
               
                console.log(data)
                setData(data['classes'])
            })
           
    }, [])
    const pageRedirection = (page) =>{
        history.push(`/student/${page}`)
    }
    return (

        <div>
            <Navb list = {navlist}/>
            <Container style={{marginTop:'25px'}}>
                <Row>

                    {data.length === 0 ?
                        <div id='alert-box'>
                        <Alert variant="dark">
                                <Alert.Heading id="col-head-2">You have not yet joined any class. Click the below link to join a new class
                                    
                                </Alert.Heading>

                                <hr />
                                <p className="mb-0" style={{textAlign:'center'}}>
                                    <Link to = '/join'>Join new class</Link>
                                </p>
                            </Alert>
                        </div> : data.map((ele) => {

                        return (
                            <div className="cls" key={ele.classcode} onClick = {()=>{pageRedirection(ele.classcode)}}>
                                <Col lg={4} sm={12}>
                                    <Card border="primary"  style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={cardimg} />
                                        <Card.Body>
                                            <Card.Title>{ele.classname}</Card.Title>
                                            <Card.Text>
                                                {ele.classowner_name}
                                            </Card.Text>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </div>)

                    })}


                </Row>


            </Container>



        </div>
    )
}
