package com.project.book.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.book.Entity.RoleEntity;

@Repository
public interface RoleRepo extends JpaRepository<RoleEntity, Long> {

}
