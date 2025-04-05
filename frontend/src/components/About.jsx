import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  const aboutImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  ];

  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col className="section-bg">
            <h1>About Learning Hub</h1>
            <p>
              Learning Hub is your ultimate destination for personal and professional growth. We are passionate about making education accessible to everyone, everywhere. Our platform brings together a vast library of courses, expert instructors, and a vibrant community of learners to help you achieve your goals.
            </p>
            <p>
              Whether you’re looking to switch careers, sharpen your skills, or dive into a new hobby, Learning Hub offers something for everyone. From coding and data science to creative writing and leadership training, our courses are designed to fit your schedule and learning style. We believe that knowledge is power, and we’re here to empower you every step of the way.
            </p>
            <Row className="my-4">
              <Col md={6}>
                <Image src={aboutImages[0]} fluid rounded alt="Learning Community" />
              </Col>
              <Col md={6}>
                <Image src={aboutImages[1]} fluid rounded alt="Team Collaboration" />
              </Col>
            </Row>
            <p>
              Founded with the vision of bridging the gap between curiosity and expertise, Learning Hub combines cutting-edge technology with high-quality content. Our courses are crafted by industry leaders and educators who bring real-world experience to the table. With interactive quizzes, hands-on projects, and peer discussions, we ensure that learning is engaging and effective.
            </p>
            <h3>Why Choose Learning Hub?</h3>
            <p>
              At Learning Hub, we go beyond traditional education. Our platform offers flexible learning paths, allowing you to learn at your own pace—whether it’s 10 minutes a day or a deep dive over the weekend. We provide certificates upon course completion, which you can showcase to employers or add to your professional portfolio.
            </p>
            <p>
              We’re committed to fostering a global learning community. Connect with fellow learners, share your progress, and get inspired by others’ success stories. Our intuitive interface makes it easy to track your achievements, set goals, and discover new courses tailored to your interests.
            </p>
            <h3>Our Mission</h3>
            <p>
              Our mission is simple: to democratize education and unlock human potential. We strive to create a world where anyone can learn anything, anytime. By offering affordable, high-quality courses, we aim to break down barriers and provide opportunities for lifelong learning.
            </p>
            <p>
              Learning Hub isn’t just a platform—it’s a movement. We’re here to support you in building the skills you need for the future, whether it’s adapting to a rapidly changing job market or pursuing a passion project. Join us today and become part of a community that values growth, curiosity, and innovation.
            </p>
            <h3>What Sets Us Apart</h3>
            <p>
              Unlike other platforms, Learning Hub emphasizes practical, real-world applications. Our courses include hands-on projects, case studies, and simulations to ensure you can apply what you learn. We also offer personalized recommendations based on your interests and career goals, making your learning journey truly unique.
            </p>
            <p>
              With a focus on affordability, we provide many free resources alongside our premium courses. Our team is dedicated to constantly updating our content to reflect the latest trends and technologies, ensuring you’re always learning what’s relevant.
            </p>
            <h3>Our Vision for the Future</h3>
            <p>
              We envision a future where education is a universal right, not a privilege. Learning Hub is working towards this by expanding our course offerings, integrating cutting-edge tools like AI-driven learning paths, and partnering with global institutions to certify our programs.
            </p>
            <p>
              Our goal is to empower millions of learners worldwide, from rural students to corporate professionals. We’re constantly innovating—adding virtual reality lessons, live workshops, and mentorship programs to enhance your experience. At Learning Hub, the future of learning is bright, and you’re at the heart of it.
            </p>
            <h3>Join Our Community</h3>
            <p>
              Learning is better together. That’s why Learning Hub offers forums, study groups, and live Q&A sessions with instructors. Share your projects, ask questions, and grow alongside peers who are just as passionate as you are. Our community is diverse, inclusive, and always ready to welcome new members.
            </p>
            <p>
              Ready to transform your life through learning? Sign up today and explore a world of possibilities with Learning Hub. Your journey starts here, and we can’t wait to see where it takes you!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;