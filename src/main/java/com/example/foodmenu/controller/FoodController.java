
package com.example.foodmenu.controller;

import com.example.foodmenu.dto.ApiResponse;
import com.example.foodmenu.dto.FoodRequestDTO;
import com.example.foodmenu.dto.FoodResponseDTO;
import com.example.foodmenu.service.FoodService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@RestController
@SecurityRequirement(name = "bearerAuth")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/add-food")
    public ApiResponse<FoodResponseDTO> addFood(
            @Valid @RequestBody FoodRequestDTO foodRequestDTO) {

        return new ApiResponse<>(
                true,
                "Food added successfully",
                foodService.addFood(foodRequestDTO)
        );
    }

    @GetMapping("/all-food")
    public ApiResponse<List<FoodResponseDTO>> getAllFood() {

        return new ApiResponse<>(
                true,
                "Food fetched successfully",
                foodService.getAllFood()
        );
    }

    @PutMapping("/update-food/{id}")
    public ApiResponse<FoodResponseDTO> updateFood(
            @PathVariable String id,
            @Valid @RequestBody FoodRequestDTO foodRequestDTO) {

        return new ApiResponse<>(
                true,
                "Food updated successfully",
                foodService.updateFood(id, foodRequestDTO)
        );
    }

    @DeleteMapping("/delete-food/{id}")
    public ApiResponse<Void> deleteFood(@PathVariable String id) {

        foodService.deleteFood(id);

        return new ApiResponse<>(
                true,
                "Food deleted successfully",
                null
        );
    }

    @GetMapping("/search")
    public ApiResponse<List<FoodResponseDTO>> searchFood(
            @RequestParam String name) {

        return new ApiResponse<>(
                true,
                "Food search completed successfully",
                foodService.searchFood(name)
        );
    }

    @GetMapping("/category")
    public ApiResponse<List<FoodResponseDTO>> getFoodByCategory(
            @RequestParam String category) {

        return new ApiResponse<>(
                true,
                "Food fetched by category successfully",
                foodService.getFoodByCategory(category)
        );
    }

    @GetMapping("/page")
    public ApiResponse<Page<FoodResponseDTO>> getAllFoodPaginated(
            Pageable pageable) {

        return new ApiResponse<>(
                true,
                "Paginated food fetched successfully",
                foodService.getAllFood(pageable)
        );
    }
}
