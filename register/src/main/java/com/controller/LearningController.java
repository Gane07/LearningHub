package com.controller;

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

import com.model.LearningEntity;
import com.model.LoginRequest;
import com.service.LearningService;

@RestController
@RequestMapping("/learning")
@CrossOrigin("*")
public class LearningController {

    private final LearningService learningService;

    @Autowired
    public LearningController(LearningService learningService) {
        this.learningService = learningService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody LearningEntity learningEntity) {
        String response = learningService.registerUser(learningEntity);

        if (response.equals("Registration successful!")) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        LearningEntity loggedInUser = learningService.loginUser(loginRequest.getUserName(), loginRequest.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping("/user/{userName}")
    public ResponseEntity<LearningEntity> getUserByUserName(@PathVariable String userName) {
        LearningEntity user = learningService.getUserByUserName(userName);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(404).body(null);  // Return 404 if user is not found
    }
    
    @PostMapping("/update")
    public ResponseEntity<?> updateUserDetails(@RequestBody LearningEntity learningEntity){
    	LearningEntity updateUser = learningService.updateUser(learningEntity);
    	if(updateUser!=null) {
    		return new ResponseEntity<LearningEntity>(updateUser,HttpStatus.OK);
    	}
    	else {
    		return new ResponseEntity<String>("User Not Present",HttpStatus.NOT_FOUND);
    	}
    }

    @DeleteMapping("/{userName}")
    public ResponseEntity<String> deleteUserByUserName(@PathVariable String userName) {
        String response = learningService.deleteUserByUserName(userName);
        if (response.equals("User deleted successfully!")) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);  // Return 404 if user is not found
    }
    
    @PostMapping("/forget/{userName}")
    public ResponseEntity<String> forgetPasswordUser(@PathVariable String userName){
    	String result = learningService.getUserPassword(userName);
    	if(result == "Username Is Incorrect") {
    		return new ResponseEntity<String>(result,HttpStatus.NOT_FOUND);
    	}
    	else {
    		return new ResponseEntity<String>(result,HttpStatus.OK);
    	}
    }
}
