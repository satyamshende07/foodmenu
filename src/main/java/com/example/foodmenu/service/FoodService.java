package com.example.foodmenu.service;

import com.example.foodmenu.entity.Food;
import com.example.foodmenu.repository.FoodRepository;
import org.springframework.stereotype.Service;
import com.example.foodmenu.dto.FoodRequestDTO;
import com.example.foodmenu.dto.FoodResponseDTO;

import java.util.List;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }


    public FoodResponseDTO addFood(FoodRequestDTO foodRequestDTO) {

        Food food = new Food();

        food.setName(foodRequestDTO.getName());
        food.setPrice(foodRequestDTO.getPrice());

        Food savedFood = foodRepository.save(food);

        FoodResponseDTO responseDTO = new FoodResponseDTO();

        responseDTO.setId(savedFood.getId());
        responseDTO.setName(savedFood.getName());
        responseDTO.setPrice(savedFood.getPrice());

        return responseDTO;
    }


    public List<FoodResponseDTO> getAllFood() {

        List<Food> foods = foodRepository.findAll();

        return foods.stream().map(food -> {

            FoodResponseDTO responseDTO = new FoodResponseDTO();

            responseDTO.setId(food.getId());
            responseDTO.setName(food.getName());
            responseDTO.setPrice(food.getPrice());

            return responseDTO;

        }).toList();
    }


    public FoodResponseDTO updateFood(String id, FoodRequestDTO updatedFoodDTO) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        existingFood.setName(updatedFoodDTO.getName());
        existingFood.setPrice(updatedFoodDTO.getPrice());

        Food updatedFood = foodRepository.save(existingFood);

        FoodResponseDTO responseDTO = new FoodResponseDTO();

        responseDTO.setId(updatedFood.getId());
        responseDTO.setName(updatedFood.getName());
        responseDTO.setPrice(updatedFood.getPrice());

        return responseDTO;
    }

    public void deleteFood(String id) {
        foodRepository.deleteById(id);
    }
}