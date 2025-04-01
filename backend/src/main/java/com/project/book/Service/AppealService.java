package com.project.book.Service;

import com.project.book.Repository.AppealRepo;
import com.project.book.Entity.AppealEntity;
import com.project.book.Entity.EmployeeEntity;
import com.project.book.dto.AppealDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppealService {

    private final AppealRepo appealRepo;

    public AppealService(AppealRepo appealRepo) {
        this.appealRepo = appealRepo;
    }

    // Employee submits appeal (Only name & description)
    public AppealDTO submitAppeal(String name, String description, EmployeeEntity employee) {
        AppealEntity appealEntity = AppealEntity.builder()
                .employee(employee)
                .name(name)
                .description(description)
                .status(AppealEntity.Status.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        AppealEntity savedAppeal = appealRepo.save(appealEntity);
        return new AppealDTO(savedAppeal);
    }

    // Admin gets all appeals
    public List<AppealDTO> getAllAppeals() {
        return appealRepo.findAll().stream().map(AppealDTO::new).collect(Collectors.toList());
    }

    // Employee gets their own appeals
    public List<AppealDTO> getEmployeeAppeals(Long employeeId) {
        return appealRepo.findByEmployeeId(employeeId).stream().map(AppealDTO::new).collect(Collectors.toList());
    }

    // Admin updates appeal status
    public AppealDTO updateAppealStatus(Long appealId, String status) {
        Optional<AppealEntity> optionalAppeal = appealRepo.findById(appealId);
        if (optionalAppeal.isPresent()) {
            AppealEntity appeal = optionalAppeal.get();
            appeal.setStatus(AppealEntity.Status.valueOf(status.toUpperCase()));
            appeal.setUpdatedAt(LocalDateTime.now());
            appealRepo.save(appeal);
            return new AppealDTO(appeal);
        }
        throw new RuntimeException("Appeal not found with ID: " + appealId);
    }
}
