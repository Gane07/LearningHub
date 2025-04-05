import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('userName');

  // Redirect if no username is found
  if (!userName) {
    navigate('/login');
  }

  // State for user details
  const [userDetails, setUserDetails] = useState({
    userName: userName || '',
    firstName: '',
    lastName: '',
    email: '',
    password: '', // Note: Password might not be returned by the backend for security
    profession: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // State for feedback form
  const [feedback, setFeedback] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/learning/user/${userName}`);
        console.log('Backend Response:', response.data); // Log to debug
        // Ensure all fields are populated, even if some are missing from response
        setUserDetails(prev => ({
          ...prev,
          ...response.data,
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          password: response.data.password || '', // Might not be returned
          profession: response.data.profession || '',
        }));
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUpdateMessage('Error loading profile data. Please try again.');
      }
    };

    fetchUserDetails();
  }, [userName]);

  // Handle user details input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle user details update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/learning/update', userDetails);
      console.log('Update Response:', response.data); // Log to debug
      setUserDetails(response.data); // Update state with returned data
      setUpdateMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateMessage('Error updating profile. Please try again.');
    }
  };

  // Handle feedback form input
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setFeedbackMessage('Please enter some feedback.');
      return;
    }

    setIsSubmittingFeedback(true);
    try {
      await axios.post(`http://localhost:8087/feedbacks/add/${userName}`, { feedback });
      setFeedbackMessage('Feedback submitted successfully!');
      setFeedback('');
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackMessage('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* User Details Section */}
          <Card className="section-bg mb-5">
            <Card.Body>
              <h2>UserName</h2> {/* Changed from "User Profile" to "UserName" */}
              <Form onSubmit={handleUpdateSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="userName">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="userName"
                        value={userDetails.userName}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profession">
                      <Form.Label>Profession</Form.Label>
                      <Form.Control
                        type="text"
                        name="profession"
                        value={userDetails.profession}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  {isEditing ? (
                    <>
                      <Button variant="primary" type="submit" className="me-2">
                        Save Changes
                      </Button>
                      <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                      Update Profile
                    </Button>
                  )}
                </div>
              </Form>
              {updateMessage && (
                <Alert variant={updateMessage.includes('Error') ? 'danger' : 'success'} className="mt-3">
                  {updateMessage}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Feedback Section */}
          <Card style={{ border: '2px solid #4a90e2', borderRadius: '10px', backgroundColor: '#fefefe' }}>
            <Card.Body>
              <h4 style={{ color: '#4a90e2', borderBottom: '2px solid #e6f0fa', paddingBottom: '0.5rem' }}>
                Submit Your Feedback
              </h4>
              <p style={{ fontStyle: 'italic', color: '#555555' }}>
                Your feedback helps us grow! As an admin user, your insights are crucial for:
              </p>
              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', color: '#333333' }}>
                <li><strong>Submit Queries:</strong> Ask questions or seek clarification on platform features.</li>
                <li><strong>Suggest Improvements:</strong> Share ideas to enhance usability or content quality.</li>
                <li><strong>Share Ideas:</strong> Propose new courses, tools, or features to enrich Learning Hub.</li>
                <li><strong>Report Issues:</strong> Highlight bugs or technical problems for quick resolution.</li>
                <li><strong>Provide Praise:</strong> Let us know what you love so we can do more of it!</li>
              </ul>
              <p style={{ color: '#555555' }}>
                Every submission is carefully reviewed by our admin team to refine and elevate the Learning Hub experience. Your input drives our innovation!
              </p>
              <Form onSubmit={handleFeedbackSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={feedback}
                        onChange={handleFeedbackChange}
                        placeholder="Share your thoughts, queries, or suggestions..."
                        style={{
                          borderColor: '#4a90e2',
                          borderRadius: '8px',
                          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmittingFeedback}
                    style={{
                      backgroundColor: '#4a90e2',
                      borderColor: '#4a90e2',
                      borderRadius: '20px',
                      padding: '0.5rem 2rem',
                    }}
                  >
                    {isSubmittingFeedback ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                        Submitting...
                      </>
                    ) : (
                      'Send Feedback'
                    )}
                  </Button>
                </div>
              </Form>
              {feedbackMessage && (
                <Alert variant={feedbackMessage.includes('Error') ? 'danger' : 'success'} className="mt-3">
                  {feedbackMessage}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;