import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import join from './createimg.svg'
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

export default function Create() {
    const history = useHistory();

    const [classname,setClassname]=useState('')
    const handlesubmit=(e)=>{
        e.preventDefault()
        const a={classname}
        console.log(a)
        fetch("/createclassroom", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(a)
        })
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            console.log(data)
            history.push("/teacherdashboard")

        })
    }
    return (
        <div>
            <Row>
                <Col id='join-col-0'>
                    <img src={join} />
                </Col>

            </Row>
            <Form onSubmit={handlesubmit}>
                    <Row>

                        <Col sm={12} >
                        <Form.Group className="mb-3" id='join-col-1'>
                                <Form.Control type="text" value={classname} placeholder="Class name" id='join-row-1-inp' onChange={(e) => { setClassname(e.target.value);console.log(classname) }} />
                                <button type="submit">Create</button>
                            </Form.Group>
                           
                        </Col>
                        
                    </Row>

            </Form>



        </div>
    )
}
