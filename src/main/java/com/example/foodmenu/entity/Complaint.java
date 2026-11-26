package com.example.foodmenu.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "complaints")
public class Complaint {

    @Id
    private String id;

    private String name;

    private String email;

    private String category;

    private String message;

    private LocalDateTime createdAt;
}