import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/esm/Container'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
export default function ClsNavbar() {
    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Classroom</Navbar.Brand>

            </Container>

            <Nav>
                <Container id='nav-right-con'>
                    <Link to='/join'><i class="fa fa-plus" style={{color:'white'}} title='join class' aria-hidden="true"></i></Link>
                    <i class="fa fa-user"  style={{color:'white'}} aria-hidden="true"></i>
                </Container>


            </Nav>
        </Navbar>

    )
}
