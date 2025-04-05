import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const MyLearning = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // For delete feedback

  useEffect(() => {
    const fetchCourses = async () => {
      const userName = sessionStorage.getItem('userName');
      if (!userName) {
        navigate('/login');
      } else {
        try {
          const response = await axios.get(`http://localhost:8086/courses/${userName}`);
          if (response.status === 200 && response.data.length > 0) {
            setCourses(response.data);
            setShowMessage(false);
          } else {
            setShowMessage(true);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
          setShowMessage(true);
        }
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleDeleteCourse = async (videoId) => {
    const userName = sessionStorage.getItem('userName');
    try {
      const response = await axios.delete(`http://localhost:8086/courses/${userName}/${videoId}`);
      if (response.status === 200) {
        // Remove the deleted course from the state
        setCourses(prevCourses => prevCourses.filter(course => course.courseId !== videoId));
        setAlertMessage('Course deleted successfully!');
        // Clear message after 3 seconds
        setTimeout(() => setAlertMessage(''), 3000);
        // If no courses remain, show the "No Courses" message
        if (courses.length === 1) {
          setShowMessage(true);
        }
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      setAlertMessage('Error deleting course. Please try again.');
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: '#2c5282' }}>My Learning</h2>
      {alertMessage && (
        <Alert variant={alertMessage.includes('Error') ? 'danger' : 'success'} className="mb-4">
          {alertMessage}
        </Alert>
      )}
      {showMessage ? (
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Alert variant="info" className="section-bg">
              <h4>No Courses Enrolled</h4>
              <p>You haven’t enrolled in any courses yet.</p>
              <Button
                variant="primary"
                onClick={() => navigate('/courses')}
                style={{ borderRadius: '20px', padding: '0.5rem 2rem' }}
              >
                Explore Available Courses
              </Button>
            </Alert>
          </Col>
        </Row>
      ) : (
        <Row>
          {courses.map((course) => (
            <Col xs={12} sm={12} md={6} lg={4} className="mb-4" key={course.courseId}>
              <Card className="h-100 section-bg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                    borderRadius: '15px 15px 0 0',
                  }}
                >
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    src={`https://www.youtube.com/embed/${course.courseId}`}
                    title={`YouTube video for ${course.title}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <Card.Body style={{ padding: '1.5rem' }}>
                  <Card.Title
                    style={{
                      color: '#2c5282',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    {course.title}
                  </Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCourse(course.courseId)}
                    style={{ borderRadius: '20px', width: '100%' }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyLearning;