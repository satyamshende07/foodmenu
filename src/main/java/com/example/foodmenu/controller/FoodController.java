
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
import io.swagger.v3.oas.annotations.Operation;



import java.util.List;

@RestController
@SecurityRequirement(name = "bearerAuth")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Food details to add to the menu",
            required = true,
            content = @io.swagger.v3.oas.annotations.media.Content(
                    examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                            value = """
                {
                    "name": "Paneer Pizza",
                    "price": 250,
                    "category": "Italian"
                }
                """
                    )
            )
    )
    @Operation(
            summary = "Add a new food item",
            description = "Creates and saves a new food item in the menu. Only ADMIN users can access this endpoint."
    )

    @io.swagger.v3.oas.annotations.responses.ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Food added successfully",
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = """
                {
                    "success": true,
                    "message": "Food added successfully",
                    "data": {
                        "id": "674abc1234567890abcdef12",
                        "name": "Paneer Pizza",
                        "price": 250,
                        "category": "Italian"
                    }
                }
                """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid food details"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing JWT"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "403",
                    description = "Forbidden - ADMIN role required"
            )
    })


    @PostMapping("/add-food")
    public ApiResponse<FoodResponseDTO> addFood(
            @Valid @RequestBody FoodRequestDTO foodRequestDTO) {

        return new ApiResponse<>(
                true,
                "Food added successfully",
                foodService.addFood(foodRequestDTO)
        );
    }
    @Operation(
            summary = "Get all food items",
            description = "Retrieves all food items available in the menu. Accessible to both USER and ADMIN roles."
    )

    @io.swagger.v3.oas.annotations.responses.ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Food items fetched successfully"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing JWT"
            )
    })


    @GetMapping("/all-food")
    public ApiResponse<List<FoodResponseDTO>> getAllFood() {

        return new ApiResponse<>(
                true,
                "Food fetched successfully",
                foodService.getAllFood()
        );
    }
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Updated food details",
            required = true,
            content = @io.swagger.v3.oas.annotations.media.Content(
                    examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                            value = """
                {
                    "name": "Cheese Pizza",
                    "price": 300,
                    "category": "Italian"
                }
                """
                    )
            )
    )
    @Operation(
            summary = "Update a food item",
            description = "Updates an existing food item's name, price, and category using its ID. Only ADMIN users can access this endpoint."
    )

    @io.swagger.v3.oas.annotations.responses.ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Food updated successfully",
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = """
                {
                    "success": true,
                    "message": "Food updated successfully",
                    "data": {
                        "id": "674abc1234567890abcdef12",
                        "name": "Cheese Pizza",
                        "price": 300,
                        "category": "Italian"
                    }
                }
                """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid food details"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing JWT"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "403",
                    description = "Forbidden - ADMIN role required"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Food item not found"
            )
    })


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

    @Operation(
            summary = "Delete a food item",
            description = "Deletes an existing food item from the menu using its ID. Only ADMIN users can access this endpoint."
    )

    @io.swagger.v3.oas.annotations.responses.ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Food deleted successfully",
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = """
                {
                    "success": true,
                    "message": "Food deleted successfully",
                    "data": null
                }
                """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing JWT"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "403",
                    description = "Forbidden - ADMIN role required"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Food item not found"
            )
    })


    @DeleteMapping("/delete-food/{id}")
    public ApiResponse<Void> deleteFood(@PathVariable String id) {

        foodService.deleteFood(id);

        return new ApiResponse<>(
                true,
                "Food deleted successfully",
                null
        );
    }
    @Operation(
            summary = "Search food items",
            description = "Searches for food items by name using case-insensitive partial matching."
    )

    @io.swagger.v3.oas.annotations.responses.ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Food search completed successfully",
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = """
                {
                    "success": true,
                    "message": "Food search completed successfully",
                    "data": [
                        {
                            "id": "674abc1234567890abcdef12",
                            "name": "Paneer Pizza",
                            "price": 250,
                            "category": "Italian"
                        }
                    ]
                }
                """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing JWT"
            )
    })


    @GetMapping("/search")
    public ApiResponse<List<FoodResponseDTO>> searchFood(
            @RequestParam String name) {

        return new ApiResponse<>(
                true,
                "Food search completed successfully",
                foodService.searchFood(name)
        );
    }
    @Operation(
            summary = "Get food by category",
            description = "Retrieves food items belonging to a specified category. Category matching is case-insensitive."
    )

    @io.swagger.v3.oas.annotations.responses.ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Food fetched by category successfully",
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = """
                {
                    "success": true,
                    "message": "Food fetched by category successfully",
                    "data": [
                        {
                            "id": "674abc1234567890abcdef12",
                            "name": "Paneer Pizza",
                            "price": 250,
                            "category": "Italian"
                        }
                    ]
                }
                """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing JWT"
            )
    })


    @GetMapping("/category")
    public ApiResponse<List<FoodResponseDTO>> getFoodByCategory(
            @RequestParam String category) {

        return new ApiResponse<>(
                true,
                "Food fetched by category successfully",
                foodService.getFoodByCategory(category)
        );
    }
    @Operation(
            summary = "Get paginated food items",
            description = "Retrieves food items using pagination and sorting. Supports page number, page size, and sorting by fields such as name and price."
    )

    @io.swagger.v3.oas.annotations.responses.ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Paginated food items fetched successfully",
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = """
                {
                    "success": true,
                    "message": "Paginated food items fetched successfully",
                    "data": {
                        "content": [
                            {
                                "id": "674abc1234567890abcdef12",
                                "name": "Paneer Pizza",
                                "price": 250,
                                "category": "Italian"
                            }
                        ],
                        "totalElements": 1,
                        "totalPages": 1,
                        "size": 5,
                        "number": 0,
                        "first": true,
                        "last": true,
                        "empty": false
                    }
                }
                """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing JWT"
            )
    })


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
