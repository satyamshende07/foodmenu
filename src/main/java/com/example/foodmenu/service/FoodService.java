package com.example.foodmenu.service;

import com.example.foodmenu.entity.Food;
import com.example.foodmenu.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public Food addFood(Food food) {
        return foodRepository.save(food);
    }

    public List<Food> getAllFood() {
        return foodRepository.findAll();
    }
    public Food updateFood(String id, Food updatedFood) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        existingFood.setName(updatedFood.getName());
        existingFood.setPrice(updatedFood.getPrice());

        return foodRepository.save(existingFood);
    }
    public void deleteFood(String id) {
        foodRepository.deleteById(id);
    }
}