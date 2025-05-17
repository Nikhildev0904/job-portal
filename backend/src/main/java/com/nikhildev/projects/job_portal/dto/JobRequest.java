package com.nikhildev.projects.job_portal.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Job type is required")
    private String jobType;

    @Min(value = 0, message = "Minimum salary cannot be negative")
    private BigDecimal minSalary;

    @Min(value = 0, message = "Maximum salary cannot be negative")
    private BigDecimal maxSalary;

    @NotBlank(message = "Description is required")
    private String description;

    private String requirements;

    private String responsibilities;

    private LocalDate applicationDeadline;

    private Boolean isRemote;

    @Min(value = 0, message = "Experience years cannot be negative")
    private Integer experienceYears;
}