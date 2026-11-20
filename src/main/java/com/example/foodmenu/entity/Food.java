package com.example.foodmenu.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "foods")
public class Food {

    @Id
    private String id;

    @NotBlank(message = "Food name cannot be empty")
    private String name;

    @Positive(message = "Price must be greater than zero")
    private double price;
}
