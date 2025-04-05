import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'linear-gradient(90deg, #2c5282 0%, #4a90e2 100%)',
        color: '#ffffff',
        padding: '2rem 0',
        marginTop: 'auto', // Ensures footer stays at the bottom
      }}
    >
      <Container>
        <Row>
          {/* Brand Section */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>LearningHub</h5>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Empowering lifelong learners with accessible, high-quality education.
            </p>
          </Col>

          {/* Navigation Links */}
          <Col md={4} className="mb-3 mb-md-0">
            <h6 style={{ fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h6>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/"
                style={{ color: '#ffffff', padding: '0.2rem 0', fontSize: '0.9rem' }}
                onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                style={{ color: '#ffffff', padding: '0.2rem 0', fontSize: '0.9rem' }}
                onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                About
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/courses"
                style={{ color: '#ffffff', padding: '0.2rem 0', fontSize: '0.9rem' }}
                onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                Available Courses
              </Nav.Link>
              {sessionStorage.getItem('userName') && sessionStorage.getItem('userName') !== 'admin' && (
                <Nav.Link
                  as={Link}
                  to="/my-learning"
                  style={{ color: '#ffffff', padding: '0.2rem 0', fontSize: '0.9rem' }}
                  onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                  onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                >
                  My Learning
                </Nav.Link>
              )}
            </Nav>
          </Col>

          {/* Contact/Support Section */}
          <Col md={4}>
            <h6 style={{ fontWeight: '600', marginBottom: '1rem' }}>Support</h6>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>
              Email: <a href="mailto:support@learninghub.com" style={{ color: '#e6f0fa', textDecoration: 'none' }}>
                support@learninghub.com
              </a>
            </p>
            <p style={{ fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
              Phone: +1 (555) 123-4567
            </p>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-3">
          <Col className="text-center">
            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              &copy; {new Date().getFullYear()} LearningHub. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;