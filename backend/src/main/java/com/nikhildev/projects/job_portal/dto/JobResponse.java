package com.nikhildev.projects.job_portal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {

    private UUID id;
    private String title;
    private String companyName;
    private String location;
    private String jobType;
    private BigInteger minSalary;
    private BigInteger maxSalary;
    private String description;
    private String requirements;
    private String responsibilities;
    private LocalDate applicationDeadline;
    private String experienceYears;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}