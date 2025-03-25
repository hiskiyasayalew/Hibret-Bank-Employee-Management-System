package com.project.book.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.book.Entity.RoleEntity;
import com.project.book.Service.RoleService;
import com.project.book.dto.RoleDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/all")
    public ResponseEntity<List<RoleEntity>> getAllRoles() {
        List<RoleEntity> roles = roleService.getAllRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleEntity> getRole(@PathVariable Long id) {
        RoleEntity roles = roleService.getRoleById(id);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> createRole(@RequestBody RoleDTO roleDTO) {
        System.out.println("\n\n\n" + roleDTO);
        if (roleDTO != null) {
            Map<String, String> result = roleService.createRole(roleDTO);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<Map<String, String>>(Map.of("error", "error hanppened"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Map<String, String>> updateRole(@PathVariable Long id, @RequestBody RoleDTO roleDTO) {
        if (roleDTO != null && id != null) {
            Map<String, String> result = roleService.updateRole(roleDTO, id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Map<String, String>>(Map.of("error", "error hanppened"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteRole(@PathVariable Long id) {

        if (id != null) {
            Map<String, String> result = roleService.deleteRole(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Map<String, String>>(Map.of("error", "error happened"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
