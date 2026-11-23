package com.example.foodmenu.repository;

import com.example.foodmenu.entity.Food;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.foodmenu.entity.Food;
import java.util.List;

public interface FoodRepository extends MongoRepository<Food, String> {
    List<Food> findByNameContainingIgnoreCase(String name);
}