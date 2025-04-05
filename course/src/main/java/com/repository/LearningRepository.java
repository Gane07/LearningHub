package com.repository;

import com.model.LearningEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningRepository extends JpaRepository<LearningEntity, Integer> {
    LearningEntity findByEmail(String email);
    LearningEntity findByUserName(String userName);  // New method to get by userName
    void deleteByUserName(String userName);  // New method to delete by userName
}
