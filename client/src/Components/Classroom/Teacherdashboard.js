import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import { useState,useEffect} from 'react'
import cardimg from './teacherimg.svg'
import ClsNavbar from "../Navbar/ClsNavbar"
import { useHistory } from 'react-router-dom'

export default function Teacherdashboard() {
    const [data,setdata]=useState([])
    const [card,setcard]=useState(false)
    const history = useHistory()
    useEffect(()=>{
        fetch("/teacherdashboard", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res=>{
            return res.json()
        })
        .then(dat=>{
           const result=dat.class;
           console.log(result)
           var del=[]
            for(let i=0;i<result.length;i++){
                del.push({"classname":result[i]["classname"],"students":result[i]["students"].length,"classcode":result[i]["classcode"]})
            }
            setdata(del)
            setcard(true)
        })
       
    },[])

    const pageRedirection = (page) =>{
        history.push(`/teacher/${page}`)
    }
    return (

        <div>
            <ClsNavbar/>
            <Container style={{marginTop:'25px'}}>
                <Row>
                    
                    {card && data.map((ele) => {
                        return(
                           <div className="cls" key={ele.classcode} onClick={()=>{pageRedirection(ele.classcode)}}>
                            <Col lg={4} sm={12}>
                               
                                <Card border="primary" style={{ width: '18rem'}}>
                                    <Card.Img variant="top" src={cardimg} />
                                    <Card.Body>
                                        <Card.Title>{ele.classname} </Card.Title>
                                        <Card.Text>
                                            {ele.students} Students
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
