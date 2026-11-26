package com.example.foodmenu.repository;

import com.example.foodmenu.entity.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {
}