package com.ganga.rbac.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ganga.rbac.dto.LoginResponseDTO;
import com.ganga.rbac.dto.UserDTO;
import com.ganga.rbac.entity.User;
import com.ganga.rbac.security.AuthenticationRequest;
import com.ganga.rbac.security.RegistrationRequest;
import com.ganga.rbac.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody AuthenticationRequest authRequest) {
        User user = userService.loginUser(authRequest);
        return ResponseEntity.ok(userService.generateToken(user));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationRequest req) {
        return new ResponseEntity<>(userService.registerUser(req), HttpStatus.CREATED);
    }

}
