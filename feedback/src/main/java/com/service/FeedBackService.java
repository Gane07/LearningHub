package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.FeedBackEntity;
import com.repository.FeedBackRepo;

@Service
public class FeedBackService {

    @Autowired
    private FeedBackRepo feedbackRepository;

    // Add feedback
    public FeedBackEntity addFeedback(FeedBackEntity feedback) {
        return feedbackRepository.save(feedback);
    }

    // Get all feedbacks for a specific user
    public List<FeedBackEntity> getFeedbacksByUserName(String userName) {
        return feedbackRepository.findByUserName(userName);
    }

    // Delete feedback by ID
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
    public List<FeedBackEntity> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
    // Get feedback by ID
    public Optional<FeedBackEntity> getFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }
}
