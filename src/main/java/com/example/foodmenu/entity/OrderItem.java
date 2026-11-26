package com.example.foodmenu.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    private String foodId;

    private String foodName;

    private double price;

    private int quantity;
}
