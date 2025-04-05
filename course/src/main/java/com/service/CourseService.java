package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.CourseEntity;
import com.model.LearningEntity;
import com.repository.CourseRepository;
import com.repository.LearningRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private LearningRepository learningRepository;
    
    @Autowired
	EmailService emailService;

    // Existing method to get all courses for a user
    public List<CourseEntity> getAllCoursesByUserName(String userName) {
        return courseRepository.findByUserName(userName);
    }

    // Existing method to delete course
    public String deleteByUserNameAndCourseId(String userName, String CourseId) {  // Changed int to Long
        // Check if the course exists
        CourseEntity course = courseRepository.findByUserNameAndCourseId(userName, CourseId);

        if (course != null) {
            // If the course exists, delete it
            courseRepository.deleteByUserNameAndCourseId(userName, CourseId);  // Changed int to Long
            return "Course deleted successfully";
        } else {
            // If the course does not exist, return a message
            return "Course not found for user: " + userName + " with id: " + CourseId;
        }
    }

     // Add new course for the user
    public String addCourse(String userName, String courseId) {
        // Check if the course already exists for this user
        CourseEntity existingCourse = courseRepository.findByUserNameAndCourseId(userName, courseId);
        if (existingCourse != null) {
            return "Course already exists for this user.";
        }

        // Create a new course entity and save it
        CourseEntity newCourse = new CourseEntity(userName, courseId);
        courseRepository.save(newCourse);

        // Fetch user details
        LearningEntity user = learningRepository.findByUserName(userName);
        
        // Email content
        String subject = "Welcome to Your New Learning Journey with LearningHub!";
        String body = "Dear " + userName + ",\n\n" +
                      "Congratulations on enrolling in your new course (Course ID: " + courseId + ")!\n\n" +
                      "We’re excited to see you embark on this journey to enhance your skills and expand your knowledge. " +
                      "This course is a fantastic opportunity to grow, whether you’re aiming to boost your career, dive into a new interest, " +
                      "or simply challenge yourself as a lifelong learner. Your dedication to self-improvement is inspiring!\n\n" +
                      "Wishing you the best of luck as you dive into this learning adventure. May it bring you closer to your goals and unlock new possibilities. " +
                      "If you need any help along the way, don’t hesitate to contact us at support@learninghub.com.\n\n" +
                      "Happy Learning!\n" +
                      "The LearningHub Team";

        emailService.sendEmail(user.getEmail(), subject, body);
        return "Course added successfully for user: " + userName;
    }
    
    public String deleteCourseAdmin(String videoId) {
    	if(videoId != null) {
    		courseRepository.deleteByCourseId(videoId);
    		return "Video Deleted By Admin";
    	}
    	else {
    		return "Video Is not there";
    	}
    }

}
