package com.ganga.rbac.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ganga.rbac.entity.Roles;

public interface RoleRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByName(String name);
}
