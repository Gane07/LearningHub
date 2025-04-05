import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Carousel } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const defaultImage = '/learning.png';
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = !!sessionStorage.getItem('userName');

  const carouselImages = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Group study
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Classroom
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Laptop work (replacing third slide)
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Desk work
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Team discussion
  ];

  // Unique captions for logged-out state
  const loggedOutCaptions = [
    {
      title: 'Unlock Your Potential',
      text: 'Join Learning Hub and dive into courses that spark your curiosity—start today!',
    },
    {
      title: 'Master New Skills',
      text: 'From coding to creativity, log in to explore a world of knowledge tailored for you.',
    },
    {
      title: 'Learn Anytime, Anywhere',
      text: 'Sign up now and turn every moment into a learning opportunity with our expert-led courses.',
    },
    {
      title: 'Build Your Future',
      text: 'Login to access hands-on projects and certifications that boost your career.',
    },
    {
      title: 'Join a Learning Community',
      text: 'Get started today and connect with millions of learners on Learning Hub!',
    },
  ];

  // Unique captions for logged-in state
  const loggedInCaptions = [
    {
      title: 'Welcome Back, Learner!',
      text: 'Pick up where you left off and conquer new courses today.',
    },
    {
      title: 'Level Up Your Skills',
      text: 'Explore fresh topics and stay ahead with exclusive content.',
    },
    {
      title: 'Your Next Challenge Awaits',
      text: 'Enroll in a course now and turn your goals into achievements.',
    },
    {
      title: 'Keep the Momentum Going',
      text: 'Dive into practical lessons and watch your progress soar.',
    },
    {
      title: 'Grow with Every Step',
      text: 'Stay curious—new courses and connections are just a click away!',
    },
  ];

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:8088/api/courses')
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [isLoggedIn]);

  const handleEnrollClick = (videoId) => {
    const userName = sessionStorage.getItem('userName');
    if (!userName) {
      navigate('/login');
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        // Before Login Content
        <>
          <Carousel className="carousel-section mb-5">
            {carouselImages.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={img}
                  alt={`Slide ${index + 1}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h3 style={{ color: '#ffffff', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    {loggedOutCaptions[index].title}
                  </h3>
                  <p style={{ color: '#ffffff', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    {loggedOutCaptions[index].text}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          <Container className="my-5">
            <Row>
              <Col className="section-bg">
                <h2>Discover a World of Learning</h2>
                <p>
                  Learning Hub is your go-to platform for mastering new skills and expanding your horizons. We offer a vast selection of courses designed to help you succeed in today’s fast-paced world. Whether you’re a student, a professional, or a lifelong learner, we have something for you.
                </p>
                <p>
                  Our mission is to make education accessible, engaging, and practical. From programming and digital marketing to photography and personal development, our courses are taught by industry experts who bring real-world insights to every lesson. With Learning Hub, you can learn at your own pace, anywhere, anytime.
                </p>
                <p>
                  Why choose Learning Hub? We provide a seamless learning experience with interactive content, hands-on projects, and a supportive community. Our platform is designed to help you build skills that matter—skills that can open doors to new opportunities and transform your life.
                </p>
                <h3>Start Your Learning Journey</h3>
                <p>
                  Getting started is easy. Sign up for free and explore our extensive course catalog. Whether you want to boost your career, switch industries, or simply learn something new, Learning Hub has the resources to help you succeed. Our flexible learning options let you study on your terms—morning, noon, or night.
                </p>
                <p>
                  We believe in the power of knowledge to change lives. That’s why we’ve partnered with top instructors and organizations to bring you high-quality content at an affordable price. Plus, with our progress tracking and personalized recommendations, you’ll always know what to learn next.
                </p>
                <p>
                  Join millions of learners worldwide who trust Learning Hub to fuel their growth. From beginner-friendly tutorials to advanced certifications, we’re here to support you every step of the way. Take control of your future—start learning today!
                </p>
                <div className="text-center mt-4">
                  <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
                    Get Started
                  </Button>
                  <Button variant="outline-primary" size="lg" className="ms-3" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        // After Login Content
        <>
          <Carousel className="carousel-section mb-5">
            {carouselImages.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={img}
                  alt={`Slide ${index + 1}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h3 style={{ color: '#ffffff', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    {loggedInCaptions[index].title}
                  </h3>
                  <p style={{ color: '#ffffff', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    {loggedInCaptions[index].text}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          <Container className="my-5">
            <Row>
              <Col className="section-bg">
                <h2>Your Learning Dashboard</h2>
                <p>
                  Welcome back! At Learning Hub, we’re thrilled to have you as part of our community. This is your space to explore new courses, track your progress, and build the skills you need to thrive in today’s world. Let’s make every moment a learning opportunity.
                </p>
                <p>
                  Our platform offers a rich variety of courses—from technical skills like web development and machine learning to creative pursuits like graphic design and music production. Each course is packed with practical exercises, expert insights, and resources to help you apply what you learn in real life.
                </p>
                <p>
                  Learning Hub is more than just a website—it’s your partner in growth. Set your goals, earn certificates, and connect with other learners who share your passion. With our intuitive tools, you can pick up where you left off, discover new topics, and stay motivated on your journey.
                </p>
                <h3>Why Keep Learning?</h3>
                <p>
                  In a world that’s constantly evolving, staying ahead means staying curious. At Learning Hub, we provide the knowledge and skills to keep you competitive. Whether you’re aiming for a promotion, exploring a side hustle, or simply feeding your curiosity, our courses are designed to deliver results.
                </p>
                <p>
                  We’re committed to your success. That’s why we offer personalized course recommendations, progress tracking, and a community forum to share ideas and get feedback. Plus, our mobile-friendly design means you can learn on the go—whether you’re commuting, traveling, or relaxing at home.
                </p>
                <p>
                  Browse the courses below and enroll in something new today. Your next big achievement is waiting—let Learning Hub help you get there!
                </p>
              </Col>
            </Row>

            {/* <Row className="mt-5">
              {courses.map((course) => (
                <Col sm={6} md={4} lg={3} className="mb-4" key={course.id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={course.image || defaultImage}
                      alt={course.title}
                    />
                    <Card.Body>
                      <Card.Title>{course.title}</Card.Title>
                      <Button
                        variant="primary"
                        onClick={() => handleEnrollClick(course.videoId)}
                      >
                        Enroll
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row> */}
          </Container>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enrollment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;