import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import cardimg from './cardimg.svg'
import ClsNavbar from "../Navbar/ClsNavbar"

export default function StudentDash() {
    const [data, setData] = useState([{ 'classname': 'Data Science', 'staff': 'Aakash' }, { 'classname': 'Data Science', 'staff': 'Aakash' }, { 'classname': 'Data Science', 'staff': 'Aakash' }])
    return (

        <div>
            <ClsNavbar/>
            <Container style={{marginTop:'25px'}}>
                <Row>

                    {data.map((ele) => {

                        return (
                            <Col sm={4}>
                                <Card border="primary" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={cardimg} />
                                    <Card.Body>
                                        <Card.Title>{ele.classname}</Card.Title>
                                        <Card.Text>
                                            {ele.staff}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                            </Col>)

                    })}


                </Row>


            </Container>



        </div>
    )
}
