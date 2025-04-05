import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  const userName = sessionStorage.getItem('userName');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <BootstrapNavbar
      expand="lg"
      style={{
        background: 'linear-gradient(90deg, #2c5282, #4a90e2)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container fluid>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            letterSpacing: '1px',
          }}
        >
          LearningHub
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarNav" />
        <BootstrapNavbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/about"
              style={{ color: '#ffffff', fontSize: '1.1rem', marginRight: '1rem', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/courses"
              style={{ color: '#ffffff', fontSize: '1.1rem', marginRight: '1rem', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Available Courses
            </Nav.Link>
            {!userName ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{ color: '#ffffff', fontSize: '1.1rem', marginRight: '1rem', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                  onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  style={{ color: '#ffffff', fontSize: '1.1rem', marginRight: '1rem', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                  onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                >
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                {userName === 'admin' ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/feedback"
                      style={{
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        marginRight: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                      onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                    >
                      <FaBell className="me-2" /> Feedbacks
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/courseUpload"
                      style={{ color: '#ffffff', fontSize: '1.1rem', marginRight: '1rem', transition: 'color 0.3s' }}
                      onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                      onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                    >
                      Add Courses
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/my-learning"
                      style={{ color: '#ffffff', fontSize: '1.1rem', marginRight: '1rem', transition: 'color 0.3s' }}
                      onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                      onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                    >
                      My Learning
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/profile"
                      style={{ color: '#ffffff', fontSize: '1.1rem', marginRight: '1rem', transition: 'color 0.3s' }}
                      onMouseEnter={(e) => (e.target.style.color = '#e6f0fa')}
                      onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                    >
                      Profile
                    </Nav.Link>
                  </>
                )}
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  style={{
                    borderRadius: '20px',
                    padding: '0.4rem 1.5rem',
                    fontSize: '1.1rem',
                    transition: 'background-color 0.3s, color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.color = '#4a90e2';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#ffffff';
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;