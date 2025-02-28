package com.ganga.rbac.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ganga.rbac.dto.JobDTO;
import com.ganga.rbac.service.HRService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/hr")
@RequiredArgsConstructor
public class HRController {
    private final HRService hrService;

    @GetMapping("/jobs")
    public ResponseEntity<List<JobDTO>> getJobs() {
        return ResponseEntity.ok(hrService.getJobs());
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(hrService.getJob(id));
    }

    @PostMapping("/job")
    public ResponseEntity<Void> saveJob(@RequestBody JobDTO jobDTO) {
        hrService.saveJob(jobDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/job")
    public ResponseEntity<Void> updateJob(@RequestBody JobDTO jobDTO) {
        System.out.println(jobDTO);
        hrService.updateJob(jobDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }
}
