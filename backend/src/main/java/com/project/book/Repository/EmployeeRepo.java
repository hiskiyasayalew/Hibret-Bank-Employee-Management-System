package com.project.book.Repository;

import com.project.book.Entity.EmployeeEntity;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<EmployeeEntity, Long> {
    Optional<EmployeeEntity> findByFirstNameAndPhoneNumber(String firstName, String phoneNumber);

}
