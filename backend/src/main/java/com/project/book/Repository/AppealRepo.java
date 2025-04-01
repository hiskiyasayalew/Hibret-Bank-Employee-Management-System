package com.project.book.Repository;

import com.project.book.Entity.AppealEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppealRepo extends JpaRepository<AppealEntity, Long> {
    List<AppealEntity> findByEmployeeId(Long employeeId);
}
