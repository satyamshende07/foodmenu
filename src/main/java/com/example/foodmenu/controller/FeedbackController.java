package com.example.foodmenu.controller;

import com.example.foodmenu.entity.Feedback;
import com.example.foodmenu.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<Feedback> addFeedback(
            @RequestBody Feedback feedback) {

        Feedback savedFeedback = feedbackService.addFeedback(feedback);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedFeedback);
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
}