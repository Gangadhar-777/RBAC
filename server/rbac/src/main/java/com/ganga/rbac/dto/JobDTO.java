package com.ganga.rbac.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {
    private Long jobId;
    private String title;
    private String description;
    private String companyName;
    private String location;
    private String employmentType;
    private Double salary;
    private LocalDate deadline;


    private UserDTO user;
}
