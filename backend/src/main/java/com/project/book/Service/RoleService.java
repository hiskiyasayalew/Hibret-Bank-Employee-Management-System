package com.project.book.Service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.book.Entity.RoleEntity;
import com.project.book.Repository.RoleRepo;
import com.project.book.dto.RoleDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepo roleRepository;

    public List<RoleEntity> getAllRoles() {
        return roleRepository.findAll();
    }

    // TODO make the findbyid role
    public RoleEntity getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    // create a role
    public Map<String, String> createRole(RoleDTO roleDTO) {
        if (roleDTO != null) {
            RoleEntity role = new RoleEntity();
            role.setName(roleDTO.getName());
            role.setDescription(roleDTO.getDescription());

            try {
                roleRepository.save(role);
                return Map.of("message", "Created role successfully");
            } catch (Exception e) {
                return Map.of("error", "role creation failed");
            }
        }

        return Map.of("error", "role has no entry");
    }

    public Map<String, String> updateRole(RoleDTO roleDTO, Long id) {
        if (roleDTO != null && id != null) {
            RoleEntity role = getRoleById(id);
            role.setId(id);
            role.setName(roleDTO.getName());
            role.setDescription(roleDTO.getDescription());

            try {
                roleRepository.save(role);
                return Map.of("message", "updated role successfully");
            } catch (Exception e) {
                return Map.of("error", "role creation failed");
            }
        }
        return Map.of("error", "role has no entry");
    }

    public Map<String, String> deleteRole(Long id) {
        if (id != null) {
            try {
                roleRepository.deleteById(id);
                return Map.of("message", "deleted user by " + id + " successfully");
            } catch (Exception e) {
                return Map.of("error", "role deletetion failed");
            }
        }
        return Map.of("error", "id is null");
    }

}
