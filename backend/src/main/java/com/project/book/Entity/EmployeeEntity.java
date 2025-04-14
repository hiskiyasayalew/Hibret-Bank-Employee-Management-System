package com.project.book.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generate Employee ID
    private Long id;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(unique = true, length = 20)
    private String phoneNumber;

    @Column(length = 100)
    private String department;

    @Column(length = 100)
    private String position;

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    private LocalDate hireDate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;  // Default value initialized

    public enum Status {
        ACTIVE, INACTIVE
    }

    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AttendanceEntity> attendances;
}
