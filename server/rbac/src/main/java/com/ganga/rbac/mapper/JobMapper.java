package com.ganga.rbac.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ganga.rbac.dto.JobDTO;
import com.ganga.rbac.dto.UserDTO;
import com.ganga.rbac.entity.Job;

@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface JobMapper {
    JobDTO toDTO(Job job);

    @Mapping(target = "user", ignore = true)
    Job toNormal(JobDTO dto);

    List<JobDTO> toListDTO(List<Job> jobs);

    List<Job> toNormalList(List<JobDTO> jobDTOs);
}
