// import React from 'react'
// import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/esm/Container'
// import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
// export default function ClsNavbar() {
//     return (

//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand href="#home">Classroom</Navbar.Brand>

//             </Container>

//             <Nav>
//                 <Container id='nav-right-con'>
//                     <Link to='/join'><i class="fa fa-plus" style={{color:'white'}} title='join class' aria-hidden="true"></i></Link>
//                     <i class="fa fa-user"  style={{color:'white'}} aria-hidden="true"></i>
//                 </Container>


//             </Nav>
//         </Navbar>

//     )
// }

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

export class Navb extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/" style={{color:'whitesmoke'}}>Classroom</Navbar.Brand>
                </Container>

                
                
                <Navbar.Toggle  aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    
                       
                    


                    <Nav>
                    <Container>
                        {this.props.list.map(ele=>{
                                    return(                    
                                        <Nav.Link href={ele['link']} style={{color:'whitesmoke'}}><i class={ele['class']} style={{color:'white'}} title={ele['title']} aria-hidden="true"></i></Nav.Link>
                                        
                                    )
                                    
                                })}
                        <Nav.Link style={{color:'whitesmoke'}}><i class="fa fa-user"  style={{color:'white'}} aria-hidden="true"></i></Nav.Link>
                    </Container>
                    </Nav>





                </Navbar.Collapse>



            </Navbar>


        )
    }
}
export default Navb;
