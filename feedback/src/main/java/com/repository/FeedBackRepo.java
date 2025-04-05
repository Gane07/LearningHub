package com.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.FeedBackEntity;

@Repository
public interface FeedBackRepo extends JpaRepository<FeedBackEntity, Long> {
    // Custom query to find feedbacks by userName
    List<FeedBackEntity> findByUserName(String userName);
}
