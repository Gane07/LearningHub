package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.CourseEntity;
import com.service.CourseService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/courses")
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseService userCourseService;

    // Get all courses for a user
    @GetMapping("/{userName}")
    public List<CourseEntity> getAllCourses(@PathVariable String userName) {
        return userCourseService.getAllCoursesByUserName(userName);
    }

    // Delete course for a user
    @Transactional
    @DeleteMapping("/{name}/{videoId}")
    public String deleteCourse(@PathVariable String name, @PathVariable String videoId) {  // Changed int to Long
        return userCourseService.deleteByUserNameAndCourseId(name, videoId);  // Changed int to Long
    }

    // Add a new course for a user
    @PostMapping("/addCourse/{userName}/{videoId}")
    public String addCourse(@PathVariable String userName, @PathVariable String videoId) {
        return userCourseService.addCourse(userName, videoId);
    }
    
    @DeleteMapping("/delete/{videoId}")
    public String deleteCourseByAdmin(@PathVariable String videoId) {
    	return userCourseService.deleteCourseAdmin(videoId);
    }
}
