package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.AdminEntity;
import com.repository.AdminRepo;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepository;

    public List<AdminEntity> getAllCourses() {
        return adminRepository.findAll();
    }

    public Optional<AdminEntity> getCourseById(Long id) {
        return adminRepository.findById(id);
    }

    public AdminEntity addCourse(AdminEntity course) {
        return adminRepository.save(course);
    }

    public void deleteCourse(Long id) {
        adminRepository.deleteById(id);
    }
}
