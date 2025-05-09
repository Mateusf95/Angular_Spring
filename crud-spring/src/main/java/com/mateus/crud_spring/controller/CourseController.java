package com.mateus.crud_spring.controller;

import com.mateus.crud_spring.model.Course;
import com.mateus.crud_spring.repository.CourseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> list(){
        return this.courseRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody Course course) {
        return this.courseRepository.save(course);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> finById(@PathVariable Long id) {
        return this.courseRepository.findById(id)
                .map(course -> ResponseEntity.ok().body(course))
                .orElse(ResponseEntity.notFound().build());
    }
}
