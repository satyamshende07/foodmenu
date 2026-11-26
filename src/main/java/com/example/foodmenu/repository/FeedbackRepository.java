package com.example.foodmenu.repository;

import com.example.foodmenu.entity.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
}