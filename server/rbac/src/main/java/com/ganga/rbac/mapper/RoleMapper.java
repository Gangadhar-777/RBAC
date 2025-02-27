package com.ganga.rbac.mapper;

import org.mapstruct.Mapper;

import com.ganga.rbac.dto.RolesDTO;
import com.ganga.rbac.entity.Roles;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RolesDTO toDTO(Roles role);
    Roles toRole(RolesDTO dto);
}
