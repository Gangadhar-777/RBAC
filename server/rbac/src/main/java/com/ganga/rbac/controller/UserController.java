package com.ganga.rbac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ganga.rbac.dto.UserDTO;
import com.ganga.rbac.entity.User;
import com.ganga.rbac.mapper.UserMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserMapper userMapper;

    @GetMapping
    public ResponseEntity<UserDTO> loginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        System.out.println("LOGGED!");
        return ResponseEntity.ok(userMapper.toDTO(currentUser));
    }
}
