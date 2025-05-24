package com.nikhildev.projects.job_portal.services;

import com.nikhildev.projects.job_portal.dto.JobRequest;
import com.nikhildev.projects.job_portal.dto.JobResponse;
import com.nikhildev.projects.job_portal.exceptions.ResourceNotFoundException;
import com.nikhildev.projects.job_portal.models.Job;
import com.nikhildev.projects.job_portal.repositories.JobRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public Map<String, Object> getAllJobs(String title, String location, String jobType,
                                          BigInteger minSalary, BigInteger maxSalary,
                                          String cursor, int limit,
                                          String sortBy, String sortDirection) {
        // Create specification for filtering
        Specification<Job> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (title != null && !title.isEmpty()) {
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(
                                        criteriaBuilder.lower(root.get("title")),
                                        "%" + title.toLowerCase() + "%"),
                                criteriaBuilder.like(
                                        criteriaBuilder.lower(root.get("companyName")),
                                        "%" + title.toLowerCase() + "%")
                        )
                );
            }

            if (location != null && !location.isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("location")),
                        "%" + location.toLowerCase() + "%"));
            }

            if (jobType != null && !jobType.isEmpty()) {
                try {
                    Job.JobType type = Job.JobType.valueOf(jobType);
                    predicates.add(criteriaBuilder.equal(root.get("jobType"), type));
                } catch (IllegalArgumentException ignored) {
                    // Invalid job type, ignore this filter
                }
            }

            if (minSalary != null && maxSalary != null) {
                predicates.add(criteriaBuilder.and(
                        criteriaBuilder.lessThanOrEqualTo(root.get("minSalary"), maxSalary),
                        criteriaBuilder.greaterThanOrEqualTo(
                                criteriaBuilder.coalesce(root.get("maxSalary"), root.get("minSalary")),
                                minSalary
                        )
                ));
            } else if (minSalary != null) {
                // If only min is set, show jobs where maxSalary >= userMin
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        criteriaBuilder.coalesce(root.get("maxSalary"), root.get("minSalary")),
                        minSalary
                ));
            } else if (maxSalary != null) {
                // If only max is set, show jobs where minSalary <= userMax
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("minSalary"), maxSalary));
            }

            // Cursor-based pagination
            if (cursor != null && !cursor.isEmpty()) {
                try {
                    UUID cursorId = UUID.fromString(cursor);
                    Job cursorJob = jobRepository.findById(cursorId)
                            .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + cursor));

                    // Add predicate for cursor-based pagination
                    if (sortBy.equals("salary")) {
                        if (sortDirection.equals("asc")) {
                            predicates.add(criteriaBuilder.or(
                                    criteriaBuilder.greaterThan(root.get("minSalary"), cursorJob.getMinSalary()),
                                    criteriaBuilder.and(
                                            criteriaBuilder.equal(root.get("minSalary"), cursorJob.getMinSalary()),
                                            criteriaBuilder.greaterThan(root.get("id"), cursorJob.getId()))
                            ));
                        } else {
                            predicates.add(criteriaBuilder.or(
                                    criteriaBuilder.lessThan(root.get("minSalary"), cursorJob.getMinSalary()),
                                    criteriaBuilder.and(
                                            criteriaBuilder.equal(root.get("minSalary"), cursorJob.getMinSalary()),
                                            criteriaBuilder.lessThan(root.get("id"), cursorJob.getId())
                                    )
                            ));
                        }
                    } else if (sortBy.equals("experience")) {
                        if (sortDirection.equals("asc")) {
                            predicates.add(criteriaBuilder.or(
                                    criteriaBuilder.greaterThan(root.get("experienceYears"), cursorJob.getExperienceYears()),
                                    criteriaBuilder.and(
                                            criteriaBuilder.equal(root.get("experienceYears"), cursorJob.getExperienceYears()),
                                            criteriaBuilder.greaterThan(root.get("id"), cursorJob.getId()))
                            ));
                        } else {
                            predicates.add(criteriaBuilder.or(
                                    criteriaBuilder.lessThan(root.get("experienceYears"), cursorJob.getExperienceYears()),
                                    criteriaBuilder.and(
                                            criteriaBuilder.equal(root.get("experienceYears"), cursorJob.getExperienceYears()),
                                            criteriaBuilder.lessThan(root.get("id"), cursorJob.getId())
                                    )
                            ));
                        }
                    } else {
                        // Default sort by createdAt
                        if (sortDirection.equals("asc")) {
                            predicates.add(criteriaBuilder.or(
                                    criteriaBuilder.greaterThan(root.get("createdAt"), cursorJob.getCreatedAt()),
                                    criteriaBuilder.and(
                                            criteriaBuilder.equal(root.get("createdAt"), cursorJob.getCreatedAt()),
                                            criteriaBuilder.greaterThan(root.get("id"), cursorJob.getId())
                                    )
                            ));
                        } else {
                            predicates.add(criteriaBuilder.or(
                                    criteriaBuilder.lessThan(root.get("createdAt"), cursorJob.getCreatedAt()),
                                    criteriaBuilder.and(
                                            criteriaBuilder.equal(root.get("createdAt"), cursorJob.getCreatedAt()),
                                            criteriaBuilder.lessThan(root.get("id"), cursorJob.getId())
                                    )
                            ));
                        }
                    }
                } catch (Exception ignored) {
                    // Invalid cursor, ignore
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        // Determine sort order
        Sort sort;
        if (sortBy.equals("salary")) {
            sort = Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "minSalary");
        } else if (sortBy.equals("experience")) {
            sort = Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "experienceYears");
        } else {
            sort = Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "createdAt");
        }
        sort = sort.and(Sort.by("id")); // Secondary sort by ID for stability

        // Fetch jobs with limit + 1 to check if there are more
        List<Job> jobs = jobRepository.findAll(spec, PageRequest.of(0, limit + 1, sort)).getContent();

        boolean hasMore = false;
        String nextCursor = null;

        if (jobs.size() > limit) {
            hasMore = true;
            jobs = jobs.subList(0, limit);
            Job lastJob = jobs.get(jobs.size() - 1);
            nextCursor = lastJob.getId().toString();
        }

        List<JobResponse> jobResponses = jobs.stream()
                .map(this::mapToJobResponse)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("data", jobResponses);
        response.put("nextCursor", nextCursor);
        response.put("hasMore", hasMore);

        return response;
    }

    public JobResponse getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return mapToJobResponse(job);
    }

    public JobResponse createJob(JobRequest jobRequest) {
        Job job = Job.builder()
                .title(jobRequest.getTitle())
                .companyName(jobRequest.getCompanyName())
                .location(jobRequest.getLocation())
                .jobType(Job.JobType.valueOf(jobRequest.getJobType()))
                .minSalary(jobRequest.getMinSalary())
                .maxSalary(jobRequest.getMaxSalary())
                .description(jobRequest.getDescription())
                .requirements(jobRequest.getRequirements())
                .responsibilities(jobRequest.getResponsibilities())
                .applicationDeadline(jobRequest.getApplicationDeadline())
                .experienceYears(jobRequest.getExperienceYears())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Job savedJob = jobRepository.save(job);
        return mapToJobResponse(savedJob);
    }

    public JobResponse updateJob(UUID id, JobRequest jobRequest) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        job.setTitle(jobRequest.getTitle());
        job.setCompanyName(jobRequest.getCompanyName());
        job.setLocation(jobRequest.getLocation());
        job.setJobType(Job.JobType.valueOf(jobRequest.getJobType()));
        job.setMinSalary(jobRequest.getMinSalary());
        job.setMaxSalary(jobRequest.getMaxSalary());
        job.setDescription(jobRequest.getDescription());
        job.setRequirements(jobRequest.getRequirements());
        job.setResponsibilities(jobRequest.getResponsibilities());
        job.setApplicationDeadline(jobRequest.getApplicationDeadline());
        job.setExperienceYears(jobRequest.getExperienceYears());
        job.setUpdatedAt(LocalDateTime.now());

        Job updatedJob = jobRepository.save(job);
        return mapToJobResponse(updatedJob);
    }

    public void deleteJob(UUID id) {
        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }

    private JobResponse mapToJobResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .companyName(job.getCompanyName())
                .location(job.getLocation())
                .jobType(job.getJobType().name())
                .minSalary(job.getMinSalary())
                .maxSalary(job.getMaxSalary())
                .description(job.getDescription())
                .requirements(job.getRequirements())
                .responsibilities(job.getResponsibilities())
                .applicationDeadline(job.getApplicationDeadline())
                .experienceYears(job.getExperienceYears())
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .build();
    }
}