package com.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.AdminEntity;

@Repository
public interface AdminRepo extends JpaRepository<AdminEntity, Long> {
}
