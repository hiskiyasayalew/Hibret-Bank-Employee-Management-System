package com.project.book.dto;

import com.project.book.Entity.AppealEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppealDTO {

    private Long id;
    private Long employee_id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;

    public AppealDTO(AppealEntity appealEntity) {
        this.id = appealEntity.getId();
        this.employee_id = appealEntity.getEmployee().getId();
        this.createdAt = appealEntity.getCreatedAt();
        this.updatedAt = appealEntity.getUpdatedAt();
        this.status = appealEntity.getStatus().name();
    }
}