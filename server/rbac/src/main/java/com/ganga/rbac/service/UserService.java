package com.ganga.rbac.service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ganga.rbac.dto.LoginResponseDTO;
import com.ganga.rbac.dto.UserDTO;
import com.ganga.rbac.entity.Roles;
import com.ganga.rbac.entity.User;
import com.ganga.rbac.mapper.UserMapper;
import com.ganga.rbac.repo.RoleRepository;
import com.ganga.rbac.repo.UserRepository;
import com.ganga.rbac.security.AuthenticationRequest;
import com.ganga.rbac.security.RegistrationRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final UserMapper userMapper;

    public User loginUser(AuthenticationRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()));
        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Invalid email " + authRequest.getEmail()));
        return user;
    }

    public LoginResponseDTO generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getName());         
        claims.put("roles", user.getAuthorities().stream().map(auth -> auth.getAuthority())
                .collect(Collectors.joining(","))); 

        String jwtToken = jwtService.generateToken(claims, user);
        LoginResponseDTO loginResponse = new LoginResponseDTO();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return loginResponse;
    }

    public UserDTO getUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User for email - " + email + " Doesn't exist!"));

        UserDTO userDTO = userMapper.toDTO(user);
        return userDTO;
    }

    public User getUserDetails(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User for email - " + email + " Doesn't exist!"));
        return user;
    }

    public UserDTO registerUser(RegistrationRequest request) {
        User user = userMapper.toUserViaRegistration(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Roles role = roleRepository.findByName("STUDENT").get();

        user.addRole(role);
        User newUser = userRepository.save(user);

        UserDTO dto = userMapper.toDTO(newUser);
        return dto;
    }

}
