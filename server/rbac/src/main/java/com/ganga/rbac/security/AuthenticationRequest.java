package com.ganga.rbac.security;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    @NotEmpty(message = "Email shouldn't be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    @Size(min = 5, max = 20, message = "Password must be in between 5 to 20 characters")
    private String password;
}
