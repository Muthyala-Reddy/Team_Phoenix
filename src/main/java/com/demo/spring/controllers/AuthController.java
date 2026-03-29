package com.demo.spring.controllers;

import com.demo.spring.dto.LoginResponse;
import com.demo.spring.entity.Users;
import com.demo.spring.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Users req) {

        Users user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username"));

        if (!user.getPassword().equals(req.getPassword())) {
            return ResponseEntity.status(401).build();
        }


        return ResponseEntity.ok(
                new LoginResponse(user.getUsername(), user.getRole())
        );
    }
}