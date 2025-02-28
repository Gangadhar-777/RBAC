CREATE DATABASE rbac;

USE rbac;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS User_Roles;
DROP TABLE IF EXISTS Permissions;
DROP TABLE IF EXISTS Role_Permissions;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE User(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(100),
    email VARCHAR(255),
    password VARCHAR(255),
    is_active BOOLEAN,
    is_locked BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Roles(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE Permissions(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE role_permissions (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

INSERT INTO roles(name)
VALUES ("ADMIN"), ("HR"), ("STUDENT"), ("COLLEGE");
