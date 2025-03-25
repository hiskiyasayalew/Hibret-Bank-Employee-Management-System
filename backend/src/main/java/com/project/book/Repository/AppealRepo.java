package com.project.book.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.book.Entity.AppealEntity;

@Repository
public interface AppealRepo extends JpaRepository<AppealEntity, Long> {

}
