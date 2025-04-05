import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import CourseUpload from './components/CourseUpload';
import Feedback from './components/Feedback';
import About from './components/About';
import AvailableCourses from './components/AvailableCourses';
import MyLearning from './components/MyLearning';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <div className="container">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/courseUpload" element={<CourseUpload />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<AvailableCourses />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;