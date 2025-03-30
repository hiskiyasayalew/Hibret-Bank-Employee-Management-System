package com.project.book.Service;

import com.project.book.dto.EmployeeDTO;
import com.project.book.Entity.EmployeeEntity;
import com.project.book.Entity.UserEntity;
import com.project.book.Repository.EmployeeRepo;
import com.project.book.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    private final UserRepository userRepository;

    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        EmployeeEntity employeeEntity = EmployeeEntity.builder()
                .firstName(employeeDTO.getFirstName())
                .lastName(employeeDTO.getLastName())
                .phoneNumber(employeeDTO.getPhoneNumber())
                .department(employeeDTO.getDepartment())
                .position(employeeDTO.getPosition())
                .salary(employeeDTO.getSalary())
                .hireDate(employeeDTO.getHireDate())
                .status(EmployeeEntity.Status.valueOf(employeeDTO.getStatus().toUpperCase()))
                .user(user)
                .build();

        EmployeeEntity savedEmployee = employeeRepo.save(employeeEntity);
        
        return new EmployeeDTO(
                savedEmployee.getFirstName(),
                savedEmployee.getLastName(),
                savedEmployee.getPhoneNumber(),
                savedEmployee.getDepartment(),
                savedEmployee.getPosition(),
                savedEmployee.getSalary(),
                savedEmployee.getHireDate(),
                savedEmployee.getStatus().name());
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll().stream()
                .map(employee -> new EmployeeDTO(
                        employee.getFirstName(),
                        employee.getLastName(),
                        employee.getPhoneNumber(),
                        employee.getDepartment(),
                        employee.getPosition(),
                        employee.getSalary(),
                        employee.getHireDate(),
                        employee.getStatus().name()))
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Optional<EmployeeEntity> employeeEntity = employeeRepo.findById(id);
        return employeeEntity.map(employee -> new EmployeeDTO(
                employee.getFirstName(),
                employee.getLastName(),
                employee.getPhoneNumber(),
                employee.getDepartment(),
                employee.getPosition(),
                employee.getSalary(),
                employee.getHireDate(),
                employee.getStatus().name())).orElse(null);
    }

    public void deleteEmployee(Long id) {
        employeeRepo.deleteById(id);
    }
}