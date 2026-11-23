package com.example.foodmenu.repository;

import com.example.foodmenu.entity.Food;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FoodRepository extends MongoRepository<Food, String> {

    List<Food> findByNameContainingIgnoreCase(String name);

    List<Food> findByCategoryIgnoreCase(String category);

    Page<Food> findAll(Pageable pageable);
}