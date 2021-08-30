import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [student, setStudent] = useState(false);
    const [teacher, setTeacher] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const [icon, seticon] = useState('visibility_off')
    const textinput = useRef(null);
    function handleclick() {
        if (textinput.current.type === "password") {
            textinput.current.type = "text"
            seticon('visibility')
        }
        else {
            textinput.current.type = "password"
            seticon('visibility_off')
        }

    }
    const handlesubmit = (e) => {
        e.preventDefault()
        if(username==='' || email==='' || password===''){
            alert("Kindly enter valid details..")
        }
        else{
        const a = { username, email, password ,student,teacher}
        fetch("/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(a)
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //const s = data.id.insertedId
                //console.log(data.id.insertedId)
                //history.push(`/user/${s}/dashboard`);
                if(data.success && data.teacher){
                    history.push("/teacherdashboard")
                }
                if(data.success && data.student){
                    history.push("/studentdashboard")
                }
                if(!data.success){
                    history.push("/")
                }
            })
        }
    }
    const Google = (response) => {
        console.log(response.profileObj)
        let a = {
            "username": response.profileObj.name,
            "email": response.profileObj.email,
            "password": response.profileObj.googleId
        }
        fetch(`/signup`, {
            method: 'POST',
            body: JSON.stringify(a),
            headers: {
                'Content-Type': 'application/json',
            }

        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //const s=data.id.insertedId
                //console.log(this.state)
                /*const s = data.id.insertedId
                console.log(data.id.insertedId)
                history.push(`/user/${s}/dashboard`);*/
                console.log(data)


            })
    }
    return (
        <div id="form-boot-con" className="d-flex align-items-center" >
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <Form onSubmit={handlesubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label id="bt-main-form-lb">Username</Form.Label>
                                <Form.Control type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="username" />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label id="bt-main-form-lb">Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label id="bt-main-form-lb">Password</Form.Label>
                                <Link><span className="material-icons" style={{ float: 'right' }} onClick={handleclick}>{icon}</span></Link>
                                <Form.Control type="password" placeholder="Password" ref={textinput} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Group>
                            <Row>
                                    
                            <Col lg={2} id="radio-col-1">
                                        <Form.Check
                                           
                                            label="Teacher"
                                            value={teacher} onChange={() => { setStudent(true); setTeacher(false); }}
                                            name="group1"
                                            type={'radio'}
                                           
                                        />
                                        </Col>
                                        <Col lg={2}>
                                        </Col>
                                        <Col lg={2} >
                                        <Form.Check 
                                           
                                            label="Student"
                                            value={student} onChange={() => { setStudent(true); setTeacher(false); }}
                                            name="group1"
                                            type={'radio'}
                                        />
                                    </Col>
                            </Row>
                            <p style={{ marginTop: '25px'}}><strong>Already have an account ? <Link to='/' style={{color:'white'}}>Login</Link></strong></p>
                            <br></br>


                            <Button variant="outline-dark" type="submit">
                                Sign up
                            </Button>
                            
                        </Form>
                        <Row style={{ marginTop: '25px', marginBottom: '25px' }}>
                            <Col lg={12}>
                                <hr style={{ backgroundColor: "gray" }} />
                            </Col>


                        </Row>
                        <Row>
                            <Col lg={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                <GoogleLogin
                                    buttonText='log in with Google'
                                    render={renderProps => (
                                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}></GoogleButton>
                                    )}

                                    onSuccess={Google}
                                    onFailure={Google}
                                    cookiePolicy={'single_host_origin'}
                                    clientId="15125709854-8uie34fks34lkg0fdpbbfru70peno1ae.apps.googleusercontent.com"
                                />


                            </Col>



                        </Row>

                    </Col>

                </Row>

            </Container>

        </div>

    );
}

export default Signup;