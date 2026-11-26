package com.example.foodmenu.repository;

import com.example.foodmenu.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {

}
