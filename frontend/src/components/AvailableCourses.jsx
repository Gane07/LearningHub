import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

const AvailableCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const defaultImage = '/learning.png';
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = !!sessionStorage.getItem('userName');
  const userName = sessionStorage.getItem('userName');
  const isAdmin = userName === 'admin'; // Check if logged-in user is admin

  useEffect(() => {
    axios.get('http://localhost:8088/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleEnrollClick = (videoId) => {
    if (!isLoggedIn) {
      setModalMessage('Please log in to enroll in courses.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } else {
      axios.post(`http://localhost:8086/courses/addCourse/${userName}/${videoId}`)
        .then(response => {
          setModalMessage('Successfully enrolled');
          setShowModal(true);
        })
        .catch(error => {
          setModalMessage('Error enrolling in course. Please try again.');
          setShowModal(true);
          console.error('Error enrolling in course:', error);
        });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8088/api/courses/${courseId}`);
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      setModalMessage('Course deleted successfully!');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000); // Auto-close modal after 2 seconds
    } catch (error) {
      console.error('Error deleting course:', error);
      setModalMessage('Error deleting course. Please try again.');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4" style={{ color: '#2c5282' }}>Available Courses</h2>
          {courses.length === 0 ? (
            <p className="text-center">No courses available at the moment.</p>
          ) : (
            <Row>
              {courses.map((course) => (
                <Col sm={6} md={4} lg={3} className="mb-4" key={course.id}>
                  <Card className="h-100 section-bg" style={{ borderRadius: '15px' }}>
                    <Card.Img
                      variant="top"
                      src={course.image || defaultImage}
                      alt={course.title}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title style={{ color: '#4a90e2', fontWeight: 'bold' }}>
                        {course.title}
                      </Card.Title>
                      <Button
                        variant="primary"
                        onClick={() => handleEnrollClick(course.videoId)}
                        className="w-100 mb-2"
                        style={{ borderRadius: '20px' }}
                      >
                        Enroll
                      </Button>
                      {isAdmin && (
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="w-100"
                          style={{ borderRadius: '20px' }}
                        >
                          Delete
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage.includes('enroll') ? 'Enrollment Status' : 'Deletion Status'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AvailableCourses;