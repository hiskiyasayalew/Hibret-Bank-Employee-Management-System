package com.project.book.Controller;

import com.project.book.Service.AppealService;
import com.project.book.dto.AppealDTO;
import com.project.book.Entity.EmployeeEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appeals")
public class AppealController {

    private final AppealService appealService;

    public AppealController(AppealService appealService) {
        this.appealService = appealService;
    }

    // Create a new appeal
    @PostMapping("/save")
    public ResponseEntity<AppealDTO> saveAppeal(@RequestBody AppealDTO appealDTO, @RequestParam Long employeeId) {
        // Assuming the EmployeeEntity can be fetched by employeeId (You may need to
        // retrieve it via a service)
        EmployeeEntity employee = new EmployeeEntity(); // In reality, you would fetch this from the database.
        employee.setId(employeeId);

        AppealDTO savedAppeal = appealService.saveAppeal(appealDTO, employee);
        return ResponseEntity.status(201).body(savedAppeal);
    }

    // Get an appeal by ID
    @GetMapping("/{appealId}")
    public ResponseEntity<AppealDTO> getAppealById(@PathVariable Long appealId) {
        AppealDTO appealDTO = appealService.getAppealById(appealId);
        return ResponseEntity.ok(appealDTO);
    }
}