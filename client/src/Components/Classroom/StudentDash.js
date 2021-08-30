import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import ClsNavbar from "../Navbar/ClsNavbar"
import cardimg from './cardimg2.svg'

export default function StudentDash() {
    const history = useHistory()
    const [data, setData] = useState([])
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
            <ClsNavbar/>
            <Container style={{marginTop:'25px'}}>
                <Row>

                    {data.length === 0 ?<Spinner animation="border" id="centering" role="status">
  
</Spinner>: data.map((ele) => {

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
