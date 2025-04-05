package com.project.book.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.book.Entity.UserEntity;

import com.project.book.Service.UserService;

import com.project.book.dto.UserDTO;
import com.project.book.dto.loginDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserEntity>> getAllUser() {
        List<UserEntity> users = userService.getAllUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // creating a new user
    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody UserDTO userDTO) {
        System.out.println("\n\n\n" + userDTO);
        if (userDTO != null) {
            Map<String, String> result = userService.createUser(userDTO);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(Map.of("error", "Invalid request"), HttpStatus.BAD_REQUEST);
        }
    }
    // localhost:8080/users/id

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneUser(@PathVariable Long id) {
        UserEntity user = userService.getUserById(id);

        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "user by id " + id + " no found"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/{userName}")
    public ResponseEntity<?> findByUserName(@PathVariable String userName) {
        UserEntity user = userService.getUserByUserName(userName);

        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "User with username " + userName + " not found"),
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody loginDTO loginDTO) {
        UserEntity user = userService.getUserByUserName(loginDTO.getUserName());

        if (user != null &&
    user.getUserName().equals(loginDTO.getUserName()) &&
    user.getPassword().equals(loginDTO.getPassword())) {
            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }
    }

}
