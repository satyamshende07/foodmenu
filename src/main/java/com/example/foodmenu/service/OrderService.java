
package com.example.foodmenu.service;

import com.example.foodmenu.entity.Order;
import com.example.foodmenu.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order placeOrder(Order order) {

        order.setOrderStatus("PENDING");

        order.setOrderDate(LocalDateTime.now());

        return orderRepository.save(order);
    }
}
