package com.example.foodmenu.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    private String id;

    private String customerName;

    private String mobileNumber;

    private String address;

    private String paymentMethod;

    private List<OrderItem> items;

    private double totalAmount;

    private String orderStatus;

    private LocalDateTime orderDate;
}
