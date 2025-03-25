package com.project.book.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.book.Entity.AttendanceEntity;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepo extends JpaRepository<AttendanceEntity, Long> {

    // attendance by Employee ID
    List<AttendanceEntity> findByEmployeeId(Long employee_id);

    // attendance by Employee ID and Date
    Optional<AttendanceEntity> findByEmployeeIdAndDate(Long employee_id, LocalDate date);

    // attendance records for a specific date
    List<AttendanceEntity> findByDate(LocalDate date);
}