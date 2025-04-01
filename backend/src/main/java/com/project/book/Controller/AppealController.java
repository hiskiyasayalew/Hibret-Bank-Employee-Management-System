package com.project.book.Controller;

import com.project.book.Service.AppealService;
import com.project.book.dto.AppealDTO;
import com.project.book.Entity.EmployeeEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appeals")
public class AppealController {

    private final AppealService appealService;

    public AppealController(AppealService appealService) {
        this.appealService = appealService;
    }

    // Employee submits an appeal
    @PostMapping("/submit")
    public ResponseEntity<AppealDTO> submitAppeal(@RequestBody AppealDTO appealDTO, @RequestParam Long employeeId) {
        EmployeeEntity employee = new EmployeeEntity();
        employee.setId(employeeId);

        AppealDTO savedAppeal = appealService.submitAppeal(appealDTO.getName(), appealDTO.getDescription(), employee);
        return ResponseEntity.status(201).body(savedAppeal);
    }

    // Admin gets all appeals
    @GetMapping("/all")
    public ResponseEntity<List<AppealDTO>> getAllAppeals() {
        return ResponseEntity.ok(appealService.getAllAppeals());
    }

    // Employee gets their own appeals
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AppealDTO>> getEmployeeAppeals(@PathVariable Long employeeId) {
        return ResponseEntity.ok(appealService.getEmployeeAppeals(employeeId));
    }

    // Admin updates appeal status
    @PutMapping("/update-status/{appealId}")
    public ResponseEntity<AppealDTO> updateAppealStatus(@PathVariable Long appealId, @RequestParam String status) {
        return ResponseEntity.ok(appealService.updateAppealStatus(appealId, status));
    }
}
