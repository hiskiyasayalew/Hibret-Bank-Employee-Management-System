package com.project.book.Repository;

import com.project.book.Entity.UserEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // Find UserEntity by userName
    UserEntity findByUserName(String userName);
    Optional<UserEntity> findFirstByOrderByIdAsc();

}
