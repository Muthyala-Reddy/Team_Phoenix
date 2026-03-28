package com.demo.spring.dto;

import com.demo.spring.entity.Role;

public class LoginResponse {
    private String username;
    private Role role;

    public LoginResponse(String username, Role role) {
        this.username = username;
        this.role = role;
    }

    public String getUsername() { return username; }
    public Role getRole() { return role; }
}