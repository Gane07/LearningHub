package com.service;

import com.model.LearningEntity;
import com.repository.LearningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class LearningService {

    private final LearningRepository learningEntityRepository;

    @Autowired
    public LearningService(LearningRepository learningEntityRepository) {
        this.learningEntityRepository = learningEntityRepository;
    }

    public String registerUser(LearningEntity learningEntity) {
        LearningEntity existingUser = learningEntityRepository.findByEmail(learningEntity.getEmail());
        LearningEntity existingUserName = learningEntityRepository.findByUserName(learningEntity.getUserName());
        if (existingUser != null) {
            return "Email already registered. Please try another one.";
        }
        if(existingUserName!=null)
        {
        	return "userName is already taken .Please try another one.";
        }

        if (!isValidPassword(learningEntity.getPassword())) {
            return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
        }

        learningEntityRepository.save(learningEntity);
        return "Registration successful!";
    }

    public LearningEntity loginUser(String userName, String password) {
        LearningEntity user = learningEntityRepository.findByUserName(userName);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public LearningEntity getUserByUserName(String userName) {
        return learningEntityRepository.findByUserName(userName);  // Fetch user by userName
    }

    public String deleteUserByUserName(String userName) {
        LearningEntity existingUser = learningEntityRepository.findByUserName(userName);
        if (existingUser != null) {
            learningEntityRepository.deleteByUserName(userName);  // Delete user by userName
            return "User deleted successfully!";
        }
        return "User not found.";
    }

    private boolean isValidPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        return pattern.matcher(password).matches();
    }
    
    public LearningEntity updateUser(LearningEntity learningEntity) {
    	LearningEntity user = learningEntityRepository.findByUserName(learningEntity.getUserName());
    	if(user != null) {
    		user.setFirstName(learningEntity.getFirstName());
    		user.setLastName(learningEntity.getLastName());
    		user.setEmail(learningEntity.getEmail());
    		user.setProfession(learningEntity.getProfession());
    		learningEntityRepository.save(user);
    		return user;
    	}
    	else {
    		return null;
    	}
    }
    
    public String getUserPassword(String userName) {
    	
    	LearningEntity user = learningEntityRepository.findByUserName(userName);
    	if(user != null) {
    		String password = user.getPassword();
        	return "Your Password is "+password;
    	}
    	else {
    		return "Username Is Incorrect";
    	}
    	
    }
}
