package com.example.foodmenu.controller;

import com.example.foodmenu.entity.Food;
import com.example.foodmenu.service.FoodService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/add-food")
    public Food addFood(@RequestBody Food food) {

        System.out.println("Food Name: " + food.getName());
        System.out.println("Food Price: " + food.getPrice());

        return foodService.addFood(food);
    }
    @GetMapping("/all-food")
    public List<Food> getAllFood() {
        return foodService.getAllFood();
    }

    @PutMapping("/update-food/{id}")
    public Food updateFood(@PathVariable String id,
                           @RequestBody Food food) {
        return foodService.updateFood(id, food);
    }
    @DeleteMapping("/delete-food/{id}")
    public String deleteFood(@PathVariable String id) {

        foodService.deleteFood(id);

        return "Food deleted successfully";
    }
}