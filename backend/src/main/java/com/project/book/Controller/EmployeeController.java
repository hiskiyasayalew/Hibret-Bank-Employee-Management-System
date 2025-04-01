package com.project.book.Controller;

import com.project.book.Entity.EmployeeEntity;
import com.project.book.Service.EmployeeService;
import com.project.book.dto.EmployeeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

    private final EmployeeService employeeService;

    // Create or update employee
    @PostMapping("/save")
    public ResponseEntity<EmployeeDTO> saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO savedEmployee = employeeService.saveEmployee(employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    // Get all employees
    @GetMapping("/all")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO employee = employeeService.getEmployeeById(id);
        return employee != null ? ResponseEntity.ok(employee) : ResponseEntity.notFound().build();
    }

    // Delete employee by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateEmployee(@RequestBody EmployeeDTO employeeDTO) {
        Optional<EmployeeEntity> employee = employeeService.getEmployeeByFirstNameAndPhoneNumber(
                employeeDTO.getFirstName(), employeeDTO.getPhoneNumber());

        // Map<String, Optional<EmployeeEntity>> maps = new HashMap<>();
        // maps.put("result", employee.get());

        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get()); // Return full employee JSON
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message",
                    "Employee not found"));
        }

    }

    // Update employee by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO updatedEmployee = employeeService.updateEmployee(id, employeeDTO);
        return ResponseEntity.ok(updatedEmployee);
    }
    
    @GetMapping("/is-admin/{id}")
public ResponseEntity<Boolean> isAdmin(@PathVariable Long id) {
    return ResponseEntity.ok(employeeService.isAdmin(id));
}

}
