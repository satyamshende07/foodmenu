package com.example.foodmenu.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.foodmenu.entity.Food;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class FoodController {
    private List<Food> foodList = new ArrayList<>();
    @PostMapping("/add-food")
    public Food addFood(@RequestBody Food food) {

        foodList.add(food);

        return food;

    }
    @GetMapping("/all-food")
    public List<Food> getAllFood() {
        return foodList;
    }

}