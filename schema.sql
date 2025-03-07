--Deletes the employee database if it already exists
DROP DATABASE IF EXISTS employee_db;

--Creates a new employee database
CREATE DATABASE employee_db;

--Changes the directory to the employee database
\c employee_db;

-- Table for departments
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table for roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE
);

-- Table for employees
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INTEGER REFERENCES employees(id) ON DELETE SET NULL
);
