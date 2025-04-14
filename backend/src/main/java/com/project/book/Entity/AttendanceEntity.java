package com.project.book.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendances") // Ensure the table name is plural for consistency
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy load for performance
    @JoinColumn(name = "employee_id", nullable = false) // Foreign key reference to employee
    private EmployeeEntity employee; // Link to EmployeeEntity

    @Column(nullable = false)
    private LocalDate date; // Attendance date

    private LocalTime checkInTime; // Time of check-in

    private LocalTime checkOutTime; // Time of check-out

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.PRESENT; // Default status is PRESENT

    public enum Status {
        PRESENT, ABSENT, LEAVE
    }
}
