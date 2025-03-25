package com.project.book.Repository;

import com.project.book.Entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<EmployeeEntity, Long> {

    // Optional<EmployeeEntity> findByUserId(Long userId);

    // Optional<EmployeeEntity> findByPhoneNumber(String userName);

    // Optional<EmployeeEntity> findByPhoneNumber(String phoneNumber);
}
