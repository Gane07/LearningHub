package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.AdminEntity;
import com.service.AdminService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService courseService;

    @GetMapping
    public List<AdminEntity> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminEntity> getCourse(@PathVariable Long id) {
        Optional<AdminEntity> course = courseService.getCourseById(id);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AdminEntity> addCourse(@RequestBody AdminEntity course) {
        // The course data (title, videoId) will now be automatically populated by Spring from the request body.
        AdminEntity savedCourse = courseService.addCourse(course);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
