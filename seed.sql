--This mock data is provided to test out the Employee Tracker application. Feel free to input your own data if you have experience with SQL
-- Inserts data into departments table
INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('Human Resources'),
    ('Finance'),
    ('Marketing'),
    ('Sales');

-- Inserts data into roles table
INSERT INTO roles (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),
    ('Senior Software Engineer', 100000, 1),
    ('HR Manager', 75000, 2),
    ('Financial Analyst', 70000, 3),
    ('Marketing Specialist', 65000, 4),
    ('Sales Associate', 60000, 5);

-- Inserts data into employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Alice', 'Johnson', 1, NULL),  -- Software Engineer
    ('Bob', 'Smith', 2, 1),  -- Senior Software Engineer reporting to Alice
    ('Carol', 'Davis', 3, NULL),  -- HR Manager
    ('David', 'Miller', 4, NULL),  -- Financial Analyst
    ('Eve', 'Brown', 5, NULL),  -- Marketing Specialist
    ('Frank', 'Wilson', 6, NULL),  -- Sales Associate
    ('Grace', 'Taylor', 1, 1),  -- Another Software Engineer reporting to Alice
    ('Hank', 'Anderson', 6, 6); -- Sales Associate reporting to Frank