package com.project.book.Service;

import com.project.book.Repository.AppealRepo;
import com.project.book.Entity.AppealEntity;
import com.project.book.dto.AppealDTO;
import com.project.book.Entity.EmployeeEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AppealService {

    private final AppealRepo appealRepo;

    public AppealService(AppealRepo appealRepo) {
        this.appealRepo = appealRepo;
    }

    // Save appeal
    public AppealDTO saveAppeal(AppealDTO appealDTO, EmployeeEntity employee) {
        AppealEntity appealEntity = new AppealEntity();
        appealEntity.setEmployee(employee);
        appealEntity.setCreatedAt(LocalDateTime.now());
        appealEntity.setUpdatedAt(LocalDateTime.now());
        appealEntity.setStatus(AppealEntity.Status.valueOf(appealDTO.getStatus().toUpperCase()));

        AppealEntity savedAppeal = appealRepo.save(appealEntity);
        return new AppealDTO(savedAppeal);
    }

    // Get appeal by ID
    public AppealDTO getAppealById(Long appealId) {
        Optional<AppealEntity> appealEntity = appealRepo.findById(appealId);
        if (appealEntity.isPresent()) {
            return new AppealDTO(appealEntity.get());
        }
        throw new RuntimeException("Appeal not found with id: " + appealId);
    }

    // Update appeal status
    public AppealDTO updateAppealStatus(Long appealId, String status) {
        Optional<AppealEntity> appealEntity = appealRepo.findById(appealId);
        if (appealEntity.isPresent()) {
            AppealEntity appeal = appealEntity.get();
            appeal.setStatus(AppealEntity.Status.valueOf(status.toUpperCase()));
            appeal.setUpdatedAt(LocalDateTime.now());
            appealRepo.save(appeal);
            return new AppealDTO(appeal);
        }
        throw new RuntimeException("Appeal not found with id: " + appealId);
    }
}