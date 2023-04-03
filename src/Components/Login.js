import React, {useState} from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { login, getLoggedInUserData } from '../services/DataService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleSubmit = async () => {
        let userData = {
            Username,
            Password
        }
        console.log(userData);
        let token = await login(userData);
        if (token.token != null) {
            localStorage.setItem("Token", token.token);
            // getLoggedInUserData(username);
            navigate('/Dashboard');
        }
    }

    return (
        <Container>
            <Row>
                <Col className='mt-5' style={{ backgroundColor: 'gray', borderRadius: 5, padding: 50 }}>
                    <h1>Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                // Deconstructed
                                onChange={ ({target: {value}}) => setUsername(value) }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                // Undeconstructed
                                onChange={ (e) => setPassword(e.target.value) }
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            >
                            Login
                        </Button>
                    </Form>
                    <h4>Don't have an account?</h4>
                    <Button onClick={() => navigate('/CreateAccount')}>Create Account</Button>
                </Col>
            </Row>
        </Container>
    )
}