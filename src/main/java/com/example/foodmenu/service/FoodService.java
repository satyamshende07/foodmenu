package com.example.foodmenu.service;

import com.example.foodmenu.entity.Food;
import com.example.foodmenu.repository.FoodRepository;
import org.springframework.stereotype.Service;
import com.example.foodmenu.dto.FoodRequestDTO;
import com.example.foodmenu.dto.FoodResponseDTO;
import org.modelmapper.ModelMapper;
import com.example.foodmenu.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class FoodService {


    private final FoodRepository foodRepository;
    private final ModelMapper modelMapper;

    public FoodService(FoodRepository foodRepository, ModelMapper modelMapper) {
        this.foodRepository = foodRepository;
        this.modelMapper = modelMapper;
    }


    public FoodResponseDTO addFood(FoodRequestDTO foodRequestDTO) {

        Food food = modelMapper.map(foodRequestDTO, Food.class);

        Food savedFood = foodRepository.save(food);

        return modelMapper.map(savedFood, FoodResponseDTO.class);
    }



    public List<FoodResponseDTO> getAllFood() {

        List<Food> foods = foodRepository.findAll();

        return foods.stream()
                .map(food -> modelMapper.map(food, FoodResponseDTO.class))
                .toList();
    }


    public FoodResponseDTO updateFood(String id, FoodRequestDTO updatedFoodDTO) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + id));

        modelMapper.map(updatedFoodDTO, existingFood);

        Food updatedFood = foodRepository.save(existingFood);

        return modelMapper.map(updatedFood, FoodResponseDTO.class);
    }

    public void deleteFood(String id) {
        foodRepository.deleteById(id);
    }
    public List<FoodResponseDTO> searchFood(String name) {
        List<Food> foods = foodRepository
                .findByNameContainingIgnoreCase(name);

        return foods.stream()
                .map(food -> modelMapper.map(food, FoodResponseDTO.class))
                .toList();
    }
}