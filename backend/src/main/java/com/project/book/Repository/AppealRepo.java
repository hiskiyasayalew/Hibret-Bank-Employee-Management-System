package com.project.book.Repository;

import com.project.book.Entity.AppealEntity;
import com.project.book.Entity.EmployeeEntity;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppealRepo extends JpaRepository<AppealEntity, Long> {
    List<AppealEntity> findByEmployeeId(Long employeeId);

    @Transactional
    void deleteByEmployee(EmployeeEntity employee);
}
