package com.ganga.rbac.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ganga.rbac.dto.JobDTO;
import com.ganga.rbac.entity.Job;
import com.ganga.rbac.entity.User;
import com.ganga.rbac.mapper.JobMapper;
import com.ganga.rbac.repo.JobRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HRService {
    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return currentUser;
    }

    public JobDTO getJob(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job Not Found!"));
        return jobMapper.toDTO(job);
    }

    public List<JobDTO> getJobs() {
        User currentUser = getCurrentUser();
        List<Job> jobs = jobRepository.findByUser(currentUser);
        return jobMapper.toListDTO(jobs);
    }

    public void saveJob(JobDTO jobDTO) {
        User currentUser = getCurrentUser();
        Job job = jobMapper.toNormal(jobDTO);
        job.setUser(currentUser);
        jobRepository.save(job);
    }

    public void updateJob(JobDTO jobDTO) {
        Job existingJob = jobRepository.findById(jobDTO.getJobId())
                .orElseThrow(() -> new RuntimeException("Job Not Found"));

        existingJob.setCompanyName(jobDTO.getCompanyName());
        existingJob.setDeadline(jobDTO.getDeadline());
        existingJob.setDescription(jobDTO.getDescription());
        existingJob.setEmploymentType(jobDTO.getEmploymentType());
        existingJob.setLocation(jobDTO.getLocation());
        existingJob.setSalary(jobDTO.getSalary());
        existingJob.setTitle(jobDTO.getTitle());

        jobRepository.save(existingJob);
    }
}
