package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.FeedBackEntity;
import com.service.FeedBackService;

@RestController
@RequestMapping("/feedbacks")
@CrossOrigin("*")
public class FeedBackController {

    @Autowired
    private FeedBackService feedbackService;

    // Endpoint to add feedback for a specific user
    @PostMapping("/add/{userName}")
    public ResponseEntity<FeedBackEntity> addFeedback(@PathVariable String userName, @RequestBody FeedBackEntity feedback) {
        feedback.setUserName(userName);  // Set the userName in the feedback
        FeedBackEntity savedFeedback = feedbackService.addFeedback(feedback);
        return ResponseEntity.ok(savedFeedback);
    }

    // Endpoint to get all feedbacks for a specific user
    @GetMapping("/feed/{userName}")
    public ResponseEntity<List<FeedBackEntity>> getFeedbackByUserName(@PathVariable String userName) {
        List<FeedBackEntity> feedbacks = feedbackService.getFeedbacksByUserName(userName);
        if (feedbacks.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedbacks);
    }

    
    @GetMapping("/all")
    public ResponseEntity<List<FeedBackEntity>> getAllFeedbacks() {
        List<FeedBackEntity> feedbacks = feedbackService.getAllFeedbacks();
        if (feedbacks.isEmpty()) {
            return ResponseEntity.notFound().build(); // No feedbacks found
        }
        return ResponseEntity.ok(feedbacks); // Return the list of feedbacks
    }
    // Endpoint to delete feedback by userName and feedback ID
    @DeleteMapping("/deleteFeedback/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        Optional<FeedBackEntity> feedback = feedbackService.getFeedbackById(id);
        if (feedback.isPresent()) {
            feedbackService.deleteFeedback(id);
            return ResponseEntity.noContent().build(); // Successfully deleted
        }
        return ResponseEntity.notFound().build(); // If feedback is not found
    }

}
