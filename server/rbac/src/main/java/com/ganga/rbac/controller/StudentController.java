package com.ganga.rbac.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ganga.rbac.dto.JobDTO;
import com.ganga.rbac.mapper.JobMapper;
import com.ganga.rbac.repo.JobRepository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
class Student {
    private String name;
    private Integer age;
}

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    @GetMapping
    public List<Student> getStudents() {
        return new ArrayList<>(
                List.of(
                        new Student("John", 22),
                        new Student("Sara", 21),
                        new Student("Jonhathan", 25),
                        new Student("Peter", 23)));
    }

    @PostMapping
    public ResponseEntity<Student> postStudent(@RequestBody Student student) {
        System.out.println(student);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        return ResponseEntity.ok(jobMapper.toListDTO(jobRepository.findAll()));
    }
}
