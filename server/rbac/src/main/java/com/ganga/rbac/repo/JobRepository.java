package com.ganga.rbac.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ganga.rbac.entity.Job;
import com.ganga.rbac.entity.User;

import java.util.List;


public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByUser(User user);
}
