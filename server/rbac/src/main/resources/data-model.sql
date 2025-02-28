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

CREATE TABLE Jobs (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    hr_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    employment_type ENUM('Full-Time', 'Part-Time', 'Internship', 'Contract') NOT NULL,
    salary DECIMAL(10,2) DEFAULT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATE,
    FOREIGN KEY (hr_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Optional: Job Applications Table (If students can apply)
CREATE TABLE Job_Applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    student_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Accepted', 'Rejected') DEFAULT 'Pending',
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES User(id) ON DELETE CASCADE
);

INSERT INTO Permissions(name)
VALUES ('CREATE_JOB'), ('EDIT_JOB'), ('VIEW_JOB');

INSERT INTO role_permissions(role_id, permission_id)
VALUES(2, 1), (2, 2), (2, 3), (3, 3);