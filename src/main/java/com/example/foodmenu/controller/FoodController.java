package com.example.foodmenu.controller;

import com.example.foodmenu.entity.Food;
import com.example.foodmenu.service.FoodService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.example.foodmenu.dto.FoodRequestDTO;
import com.example.foodmenu.dto.FoodResponseDTO;

import java.util.List;

@RestController
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/add-food")
    public FoodResponseDTO addFood(@Valid @RequestBody FoodRequestDTO foodRequestDTO) {

        return foodService.addFood(foodRequestDTO);
    }

    @GetMapping("/all-food")
    public List<FoodResponseDTO> getAllFood() {
        return foodService.getAllFood();
    }

    @PutMapping("/update-food/{id}")
    public FoodResponseDTO updateFood(
            @PathVariable String id,
            @Valid @RequestBody FoodRequestDTO foodRequestDTO) {

        return foodService.updateFood(id, foodRequestDTO);
    }

    @DeleteMapping("/delete-food/{id}")
    public String deleteFood(@PathVariable String id) {

        foodService.deleteFood(id);

        return "Food deleted successfully";
    }
}