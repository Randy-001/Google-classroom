import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import join from './joinimg.svg'
import {useState} from 'react'
export default function Join() {
    const [classCode,setCode ] = useState('')
    const joinClass=()=>{
        let userData = {
            'classCode':classCode,
            'gmail':'aakashganesh13@gmail.com'
        }
        fetch('/joinclass', {
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
                console.log("data",data)
               

            })

    }
    return (
        <div>
                <Row>
                    <Col id='join-col-0'>
                        <img src={join}/>
                    </Col>
                    
                </Row>
                
                <Row>

                    <Col sm={12} id='join-col-1'>
                        <input placeholder = 'Class code' onChange = {(event)=>{setCode(event.target.value)}} id='join-row-1-inp'></input>
                        <button onClick = {()=>{joinClass()}}>join</button>
                    </Col>
                </Row>
                
            
        </div>
    )
}
