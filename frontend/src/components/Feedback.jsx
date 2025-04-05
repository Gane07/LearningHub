import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert, ListGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // For delete icon

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8087/feedbacks/all');
        setFeedbacks(response.data);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setError('Failed to fetch feedbacks. Please try again later.');
      }
    };

    fetchFeedbacks();
  }, []);

  // Delete feedback by ID
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8087/feedbacks/deleteFeedback/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
      setError(null); // Clear any previous error on success
    } catch (err) {
      console.error('Error deleting feedback:', err);
      setError('Failed to delete feedback. Please try again.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4" style={{ color: '#2c5282' }}>
            All User Feedbacks
          </h2>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          {feedbacks.length === 0 ? (
            <Alert variant="info" className="section-bg text-center">
              <h4>No Feedbacks Found</h4>
              <p>It seems no users have submitted feedback yet.</p>
            </Alert>
          ) : (
            <ListGroup>
              {feedbacks.map((feedback) => (
                <ListGroup.Item 
                  key={feedback.id} 
                  className="mb-3 section-bg" 
                  style={{ 
                    borderRadius: '10px', 
                    border: '1px solid #e6f0fa',
                    padding: '1.5rem'
                  }}
                >
                  <Row>
                    <Col xs={12} md={8}>
                      <h5 style={{ color: '#4a90e2', fontWeight: 'bold' }}>
                        User: {feedback.userName}
                      </h5>
                      <p style={{ color: '#333333', lineHeight: '1.6' }}>
                        <strong>Feedback:</strong> {feedback.feedback}
                      </p>
                    </Col>
                    <Col xs={12} md={4} className="text-md-end text-center">
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteFeedback(feedback.id)}
                        style={{
                          borderRadius: '20px',
                          padding: '0.4rem 1.5rem',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#dc3545';
                          e.target.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#dc3545';
                        }}
                      >
                        <FaTrash className="me-2" /> Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;