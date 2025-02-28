package com.ganga.rbac.mapper;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.ganga.rbac.dto.UserDTO;
import com.ganga.rbac.entity.Roles;
import com.ganga.rbac.entity.User;
import com.ganga.rbac.security.RegistrationRequest;

@Mapper(componentModel = "spring", uses = { RoleMapper.class })
public interface UserMapper {
    @Mapping(source = "roles", target = "roles", qualifiedByName = "rolesToString")
    @Mapping(target = "username", expression = "java(user.getName())")
    UserDTO toDTO(User user);

    @Mapping(source = "roles", target = "roles", qualifiedByName = "stringToRoles")
    User toNormal(UserDTO dto);

    User toUserViaRegistration(RegistrationRequest request);

    
    @Named("rolesToString")
    static String rolesToString(Set<Roles> roles) {
        return roles != null ? roles.stream().map(Roles::getName).collect(Collectors.joining(",")) : "";
    }

    // Converts a comma-separated String to Set<Roles>
    @Named("stringToRoles")
    static Set<Roles> stringToRoles(String roles) {
        return roles != null && !roles.isEmpty()
                ? Arrays.stream(roles.split(","))
                        .map(Roles::new).collect(Collectors.toSet())
                : Set.of();
    }
}
