package com.example.foodmenu.controller;

import com.example.foodmenu.dto.RegisterRequestDTO;
import com.example.foodmenu.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.foodmenu.dto.LoginRequestDTO;
import com.example.foodmenu.dto.LoginResponseDTO;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String register(@RequestBody RegisterRequestDTO request) {

        authService.register(request);

        return "User registered successfully";
    }
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {

        return authService.login(request);
    }
}