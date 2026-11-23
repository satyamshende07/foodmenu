
package com.example.foodmenu;

import com.example.foodmenu.entity.User;
import com.example.foodmenu.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username:}")
    private String adminUsername;

    @Value("${app.admin.password:}")
    private String adminPassword;

    public AdminInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (adminUsername.isBlank() || adminPassword.isBlank()) {
            System.out.println("Admin initialization skipped: credentials not configured.");
            return;
        }

        if (userRepository.existsByUsername(adminUsername)) {
            System.out.println("Admin account already exists.");
            return;
        }

        User admin = new User();

        admin.setUsername(adminUsername);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setRole("ADMIN");

        userRepository.save(admin);

        System.out.println("Admin account created successfully.");
    }
}
