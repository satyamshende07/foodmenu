package com.example.foodmenu.repository;

import com.example.foodmenu.entity.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FoodRepository extends MongoRepository<Food, String> {

}