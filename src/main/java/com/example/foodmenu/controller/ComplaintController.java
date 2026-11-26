package com.example.foodmenu.controller;

import com.example.foodmenu.entity.Complaint;
import com.example.foodmenu.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ResponseEntity<Complaint> addComplaint(
            @RequestBody Complaint complaint) {

        Complaint savedComplaint =
                complaintService.addComplaint(complaint);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedComplaint);
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }
}
