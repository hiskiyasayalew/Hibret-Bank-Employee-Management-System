package com.project.book.Service;

import com.project.book.dto.EmployeeDTO;
import com.project.book.Entity.EmployeeEntity;
import com.project.book.Repository.EmployeeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    // Create a new Employee (No User dependency)
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        EmployeeEntity employeeEntity = EmployeeEntity.builder()
                .firstName(employeeDTO.getFirstName())
                .lastName(employeeDTO.getLastName())
                .phoneNumber(employeeDTO.getPhoneNumber())
                .department(employeeDTO.getDepartment())
                .position(employeeDTO.getPosition())
                .salary(employeeDTO.getSalary())
                .hireDate(employeeDTO.getHireDate())
                .status(EmployeeEntity.Status.valueOf(employeeDTO.getStatus().toUpperCase()))
                .build();

        EmployeeEntity savedEmployee = employeeRepo.save(employeeEntity);

        return new EmployeeDTO(
                savedEmployee.getId(),
                savedEmployee.getFirstName(),
                savedEmployee.getLastName(),
                savedEmployee.getPhoneNumber(),
                savedEmployee.getDepartment(),
                savedEmployee.getPosition(),
                savedEmployee.getSalary(),
                savedEmployee.getHireDate(),
                savedEmployee.getStatus().name());
    }

    // Get all Employees
    public List<EmployeeDTO> getAllEmployees() {
        List<EmployeeEntity> employees = employeeRepo.findAll();
        return employees.stream().map(employee -> new EmployeeDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getPhoneNumber(),
                employee.getDepartment(),
                employee.getPosition(),
                employee.getSalary(),
                employee.getHireDate(),
                employee.getStatus().name())).collect(Collectors.toList());
    }

    // Get Employee by ID
    public EmployeeDTO getEmployeeById(Long id) {
        Optional<EmployeeEntity> employeeEntity = employeeRepo.findById(id);
        return employeeEntity.map(employee -> new EmployeeDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getPhoneNumber(),
                employee.getDepartment(),
                employee.getPosition(),
                employee.getSalary(),
                employee.getHireDate(),
                employee.getStatus().name())).orElse(null);
    }

    // Delete Employee by ID
    public void deleteEmployee(Long id) {
        employeeRepo.deleteById(id);
    }

    public Optional<EmployeeEntity> getEmployeeByFirstNameAndPhoneNumber(String firstName, String phoneNumber) {
        return employeeRepo.findByFirstNameAndPhoneNumber(firstName, phoneNumber);
    }

    // Update Employee
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        EmployeeEntity existingEmployee = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existingEmployee.setFirstName(employeeDTO.getFirstName());
        existingEmployee.setLastName(employeeDTO.getLastName());
        existingEmployee.setPhoneNumber(employeeDTO.getPhoneNumber());
        existingEmployee.setDepartment(employeeDTO.getDepartment());
        existingEmployee.setPosition(employeeDTO.getPosition());
        existingEmployee.setSalary(employeeDTO.getSalary());
        existingEmployee.setHireDate(employeeDTO.getHireDate());
        existingEmployee.setStatus(EmployeeEntity.Status.valueOf(employeeDTO.getStatus().toUpperCase()));

        EmployeeEntity updatedEmployee = employeeRepo.save(existingEmployee);

        return new EmployeeDTO(
                updatedEmployee.getId(),
                updatedEmployee.getFirstName(),
                updatedEmployee.getLastName(),
                updatedEmployee.getPhoneNumber(),
                updatedEmployee.getDepartment(),
                updatedEmployee.getPosition(),
                updatedEmployee.getSalary(),
                updatedEmployee.getHireDate(),
                updatedEmployee.getStatus().name());
    }

    public boolean isAdmin(Long id) {
        Optional<EmployeeEntity> employee = employeeRepo.findById(id);
        return employee.isPresent() && "admin".equalsIgnoreCase(employee.get().getPosition());
    }

}