package com.project.book.Service;

import com.project.book.Entity.UserEntity;
import com.project.book.Repository.UserRepository;

import com.project.book.dto.UserDTO;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // creating a new user
    public Map<String, String> createUser(UserDTO userDTO) {
        if (userDTO != null) {
            UserEntity user = new UserEntity();
            user.setUserName(userDTO.getUserName());
            user.setPassword(userDTO.getPassword());
            user.setEmail(userDTO.getEmail());
    
            // ✅ Set role with default to "Employee" if not provided
            user.setRole(userDTO.getRole() != null ? userDTO.getRole() : "Employee");
    
            try {
                userRepository.save(user);
                return Map.of("message", "Created user successfully");
            } catch (Exception e) {
                return Map.of("error", "User creation failed: " + e.getMessage());
            }
        }
    
        return Map.of("error", "User has no entry");
    }
    

    // Getting user by username
    public UserEntity getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    // Delete user
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Update user
    public boolean updateUser(Long id, UserDTO updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUserName(updatedUser.getUserName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            userRepository.save(user);
            return true;
        }).orElse(false);
    }
}
