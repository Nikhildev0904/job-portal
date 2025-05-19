package com.nikhildev.projects.job_portal.controllers;

import com.nikhildev.projects.job_portal.dto.JobRequest;
import com.nikhildev.projects.job_portal.dto.JobResponse;
import com.nikhildev.projects.job_portal.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) BigDecimal minSalary,
            @RequestParam(required = false) BigDecimal maxSalary,
            @RequestParam(required = false) String cursor,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {

        Map<String, Object> response = jobService.getAllJobs(
                title, location, jobType, minSalary, maxSalary,
                cursor, limit, sortBy, sortDirection);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable UUID id) {
        JobResponse job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest jobRequest) {
        JobResponse createdJob = jobService.createJob(jobRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable UUID id,
            @Valid @RequestBody JobRequest jobRequest) {
        JobResponse updatedJob = jobService.updateJob(id, jobRequest);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable UUID id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}