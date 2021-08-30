import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import join from './joinimg.svg'
import { useHistory } from 'react-router-dom'
import {useState} from 'react'
import { useParams } from 'react-router-dom'
export default function Test() {
    const [dueDate,setDue ] = useState('')
    const [formLink,setForm] = useState('')
    const [mark,setMark] = useState('')
    const history = useHistory()
    const { id } = useParams()
    const addForm=(event)=>{
        event.preventDefault()
        let formData = {
            'classcode':id,
            'testlink':formLink,
            'duedate':dueDate,
            'totalmarks':mark
        }
        fetch('/testform', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
               

            })

    }
    return (
        <div id='test-back-img'>

                <Row>
                    <Col sm={12} lg={6} >
                        
                    </Col>
                    
               
                    <Col sm={12} lg={6} id='test-form-col-1'>
                        <form id='test-form'  onSubmit = {()=>{addForm()}}>
                            <input placeholder = 'Form link' onChange = {(event)=>{setForm(event.target.value)}} id='form-link-inp'></input>
                            <input placeholder = 'Due date' onChange = {(event)=>{setDue(event.target.value)}} id='form-link-inp'></input>
                            <input placeholder = 'Total marks' onChange = {(event)=>{setMark(event.target.value)}} id='form-link-inp'></input>
                            <button type='submit'>Create</button>

                        </form>
                        
                    </Col>
                </Row>
                
            
        </div>
    )
}
