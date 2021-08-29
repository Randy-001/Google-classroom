import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import join from './joinimg.svg'

export default function Join() {
    return (
        <div>
                <Row>
                    <Col id='join-col-0'>
                        <img src={join}/>
                    </Col>
                    
                </Row>
                
                <Row>

                    <Col sm={12} id='join-col-1'>
                        <input placeholder = 'Class code' id='join-row-1-inp'></input>
                        <button>join</button>
                    </Col>
                </Row>
                
            
        </div>
    )
}
