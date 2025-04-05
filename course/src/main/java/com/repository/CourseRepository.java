package com.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.model.CourseEntity;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {  // Changed Integer to Long

    List<CourseEntity> findByUserName(String userName);

    // Correct the delete method to return void
    void deleteByUserNameAndId(String userName, Long id);  // Changed int to Long

    CourseEntity findByUserNameAndCourseId(String userName, String courseId);
    CourseEntity findByUserNameAndId(String userName, Long id);  // Changed int to Long

	void deleteByUserNameAndCourseId(String userName, String courseId);

	void deleteByCourseId(String videoId);
}
