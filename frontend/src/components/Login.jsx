import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false); // For forgot password modal
  const [forgotUserName, setForgotUserName] = useState(''); // Username for forgot password
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError('Username and Password are required!');
      return;
    }

    // Check for admin credentials
    if (userName === 'admin' && password === 'Admin@123') {
      sessionStorage.setItem('userName', userName);
      setModalMessage('Login successful!');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 2000);
    } else {
      // If the credentials are incorrect, make an API call
      axios.post('http://localhost:8085/learning/login', { userName, password })
        .then(response => {
          sessionStorage.setItem('userName', userName);
          setModalMessage('Login successful!');
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            navigate('/');
          }, 2000);
        })
        .catch(err => {
          setModalMessage('Invalid credentials!');
          setShowModal(true);
        });
    }
  };

  const handleForgotPassword = () => {
    setShowForgotModal(true); // Show forgot password modal
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotUserName) {
      setModalMessage('Please enter a username!');
      setShowModal(true);
      return;
    }

    axios.post(`http://localhost:8085/learning/forget/${forgotUserName}`)
      .then(response => {
        setModalMessage(response.data); // Display string response from backend
        setShowModal(true);
        setShowForgotModal(false); // Close forgot password modal
        setForgotUserName(''); // Reset forgot username
      })
      .catch(err => {
        setModalMessage(err.response?.data || 'Error processing request!');
        setShowModal(true);
        setShowForgotModal(false);
      });
  };

  return (
    <Container className="mt-5" style={{ paddingBottom: '100px' }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password *</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                />
                <InputGroup.Text 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {error && <div className="text-danger mb-3">{error}</div>}

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Login
            </Button>
            <div className="text-center">
              <Button
                variant="link"
                onClick={handleForgotPassword}
                style={{ color: '#4a90e2', textDecoration: 'none' }}
              >
                Forgot Password?
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Login Response Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal show={showForgotModal} onHide={() => setShowForgotModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForgotSubmit}>
            <Form.Group className="mb-3" controlId="forgotUserName">
              <Form.Label>Enter your username</Form.Label>
              <Form.Control
                type="text"
                value={forgotUserName}
                onChange={(e) => setForgotUserName(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Login;