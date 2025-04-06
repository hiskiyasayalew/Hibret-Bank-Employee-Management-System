package com.project.book.Service;

import com.project.book.Entity.AttendanceEntity;
import com.project.book.Repository.AttendanceRepo;
import com.project.book.dto.AttendanceDTO;
import com.project.book.Entity.EmployeeEntity;
import com.project.book.Repository.EmployeeRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepo attendanceRepo;
    private final EmployeeRepo employeeRepo;

    // Mark attendance
    @Transactional
    public AttendanceDTO markAttendance(AttendanceDTO dto) {
        // Ensure EmployeeEntity exists before proceeding
        EmployeeEntity employee = employeeRepo.findById(dto.getEmployeeId())
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
    
        // Create AttendanceEntity and associate it with the employee
        AttendanceEntity attendance = AttendanceEntity.builder()
                .employee(employee)  // Ensure this is correctly set
                .date(dto.getDate() != null ? dto.getDate() : LocalDate.now())
                .checkInTime(dto.getCheckInTime())
                .checkOutTime(dto.getCheckOutTime())
                .status(dto.getStatus())
                .build();
    
        AttendanceEntity savedAttendance = attendanceRepo.save(attendance);
        return convertToDTO(savedAttendance);
    }
    

    // Fetch attendance by Employee ID
    public List<AttendanceDTO> getAttendanceByEmployeeId(Long employee_id) {
        List<AttendanceEntity> attendanceList = attendanceRepo.findByEmployeeId(employee_id);
        return attendanceList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Fetch attendance by Employee ID and Date
    public AttendanceDTO getAttendanceByEmployeeIdAndDate(Long employeeId, LocalDate date) {
        AttendanceEntity attendance = attendanceRepo.findByEmployeeIdAndDate(employeeId, date)
                .orElseThrow(() -> new EntityNotFoundException("Attendance record not found"));
        return convertToDTO(attendance);
    }

    // Fetch all attendance records for a specific date
    public List<AttendanceDTO> getAttendanceByDate(LocalDate date) {
        return attendanceRepo.findByDate(date).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Update attendance record
    @Transactional
    public AttendanceDTO updateAttendance(Long id, AttendanceDTO dto) {
        AttendanceEntity attendance = attendanceRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendance record not found"));

        if (dto.getCheckInTime() != null)
            attendance.setCheckInTime(dto.getCheckInTime());
        if (dto.getCheckOutTime() != null)
            attendance.setCheckOutTime(dto.getCheckOutTime());
        if (dto.getStatus() != null)
            attendance.setStatus(dto.getStatus());

        AttendanceEntity updatedAttendance = attendanceRepo.save(attendance);
        return convertToDTO(updatedAttendance);
    }

    // Delete attendance record
    @Transactional
    public void deleteAttendance(Long id) {
        if (!attendanceRepo.existsById(id)) {
            throw new EntityNotFoundException("Attendance record not found");
        }
        attendanceRepo.deleteById(id);
    }

    // Convert entity to DTO
    private AttendanceDTO convertToDTO(AttendanceEntity entity) {
        return AttendanceDTO.builder()
                .id(entity.getId())
                .employeeId(entity.getEmployee().getId())
                .firstName(entity.getEmployee().getFirstName())
                .lastName(entity.getEmployee().getLastName())
                .date(entity.getDate())
                .checkInTime(entity.getCheckInTime())
                .checkOutTime(entity.getCheckOutTime())
                .status(entity.getStatus())
                .build();
    }
    
    public List<AttendanceDTO> getAllAttendances() {
        return attendanceRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
}