package com.project.book.dto;

import com.project.book.Entity.AppealEntity;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppealDTO {
    private Long id;
    private Long employeeId;  // Change name to follow Java conventions
    private String name;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AppealDTO(AppealEntity appealEntity) {
        this.id = appealEntity.getId();
        this.employeeId = appealEntity.getEmployee().getId();
        this.name = appealEntity.getName();
        this.description = appealEntity.getDescription();
        this.status = appealEntity.getStatus().name();
        this.createdAt = appealEntity.getCreatedAt();
        this.updatedAt = appealEntity.getUpdatedAt();
    }
}
