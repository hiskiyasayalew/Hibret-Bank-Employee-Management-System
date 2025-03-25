package com.project.book.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.book.Entity.UserEntity;

import com.project.book.Service.UserService;

import com.project.book.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
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

    // @PostMapping("/login")
    // public ResponseEntity<UserEntity> login(@RequestParam String username,
    // @RequestParam String password) {
    // if (username != null && password != null) {
    // UserEntity user = userService.getUserById(username);
    // if (user != null && user.getUsername().equals(username) &&
    // user.getPassword().equals(password)) {
    // return new ResponseEntity<>(user, HttpStatus.OK);
    // }
    // }
    // return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    // }

    // return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    // }

    // // Endpoint for user registration
    // @PostMapping("/signup")
    // public ResponseEntity<UserEntity> signup(@RequestBody UserEntity user) {
    // UserEntity createdUser = userService.registerUser(user);
    // return ResponseEntity.ok(createdUser);
    // }

    // // Endpoint for user login
    // @PostMapping("/login")
    // public ResponseEntity<UserEntity> login(@RequestParam String username,
    // @RequestParam String password)
    // throws LoginException {
    // UserEntity loginResponse = userService.loginUser(username, password);

    // if (loginResponse.getUser() != null) {
    // return ResponseEntity.ok(loginResponse);
    // } else {
    // return ResponseEntity.status(401).body(loginResponse); // Unauthorized
    // }
    // }

}
