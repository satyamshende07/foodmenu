
package com.example.foodmenu.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Getter
@Setter
public class FoodRequestDTO {

    @NotBlank(message = "Food name cannot be empty")
    private String name;

    @Positive(message = "Price must be greater than zero")
    private double price;

    private String category;
}
