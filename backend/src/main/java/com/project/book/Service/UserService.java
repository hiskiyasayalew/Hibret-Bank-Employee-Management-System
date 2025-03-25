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

    // public Map<String, String> createRole(UserDTO userDTO) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'createRole'");
    // }

    // public UserEntity getUserByUserName(String username) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method
    // 'getUserByUserName'");
    // }

}
