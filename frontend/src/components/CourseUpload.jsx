import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

const CourseUpload = () => {
  const [title, setTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form field changes
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleVideoIdChange = (e) => setVideoId(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoId) {
      setErrorMessage('Please fill in all fields.');
      setSuccessMessage('');
      return;
    }

    const courseData = { title, videoId };

    try {
      const response = await axios.post('http://localhost:8088/api/courses', courseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setTitle('');
      setVideoId('');
      setErrorMessage('');
      setSuccessMessage('Course added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      console.log('Response:', response.data);
    } catch (error) {
      setSuccessMessage('');
      if (error.response) {
        setErrorMessage('Failed to add the course. Please try again.');
        console.error('Error response:', error.response);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Error:', error);
      }
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}> {/* Increased from md={6} to md={8} for wider form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="section-bg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <Card.Body style={{ padding: '2rem' }}>
                <h1
                  className="text-center mb-4"
                  style={{ color: '#2c5282', fontWeight: 'bold', fontSize: '2rem' }}
                >
                  Add a New Course
                </h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="title">
                    <Form.Label style={{ color: '#4a90e2', fontWeight: '600' }}>
                      Course Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      required
                      placeholder="Enter course title"
                      style={{
                        borderRadius: '10px',
                        borderColor: '#cbd5e0',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        padding: '0.75rem',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="videoId">
                    <Form.Label style={{ color: '#4a90e2', fontWeight: '600' }}>
                      YouTube Video ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={videoId}
                      onChange={handleVideoIdChange}
                      required
                      placeholder="e.g., v=dQw4w9WgXcQ"
                      style={{
                        borderRadius: '10px',
                        borderColor: '#cbd5e0',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        padding: '1rem', // Increased padding for height
                        fontSize: '1.1rem', // Larger text
                        height: '60px', // Increased height
                        width: '100%', // Full width of parent
                      }}
                      maxLength={100} // Increased input length limit
                    />
                  </Form.Group>

                  {errorMessage && (
                    <Alert variant="danger" className="mb-4">
                      {errorMessage}
                    </Alert>
                  )}
                  {successMessage && (
                    <Alert variant="success" className="mb-4">
                      {successMessage}
                    </Alert>
                  )}

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      style={{
                        borderRadius: '20px',
                        padding: '0.75rem',
                        backgroundColor: '#4a90e2',
                        borderColor: '#4a90e2',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                      }}
                    >
                      Add Course
                    </Button>
                  </motion.div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseUpload;