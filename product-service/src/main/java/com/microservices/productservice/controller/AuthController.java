package com.microservices.productservice.controller;

import com.microservices.productservice.dto.AuthRequest;
import com.microservices.productservice.security.JwtService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public String login(
            @RequestBody AuthRequest request
    ) {

        // Hardcoded credentials
        if (
                "admin".equals(request.getUsername())
                        &&
                        "admin123".equals(request.getPassword())
        ) {

            return jwtService.generateToken(
                    request.getUsername()
            );
        }

        return "Invalid Username or Password";
    }
}