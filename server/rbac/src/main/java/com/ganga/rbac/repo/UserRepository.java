package com.ganga.rbac.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ganga.rbac.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
