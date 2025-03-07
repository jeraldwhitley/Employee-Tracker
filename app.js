// Import dependencies
import inquirer from "inquirer";
import chalk from "chalk"
import db from "./db.js";

//Lays out the main menu with options for interacting with the database
async function mainMenu() {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: chalk.blue("What would you like to do?"),
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ]);
  
    switch (choice) {
      case "View all departments":
        return viewDepartments();
      case "View all roles":
        return viewRoles();
      case "View all employees":
        return viewEmployees();
      case "Add a department":
        return addDepartment();
      case "Add a role":
        return addRole();
      case "Add an employee":
        return addEmployee();
      case "Update an employee role":
        return updateEmployeeRole();
      case "Exit":
        console.log(chalk.green("Goodbye!"));
        process.exit();
    }
  }
  
  //View Departments
  async function viewDepartments() {
    const { rows } = await db.query("SELECT * FROM departments");
    console.table(rows);
    mainMenu();
  }

  // View roles 
  async function viewRoles() {
    const { rows } = await db.query(`
      SELECT roles.id, roles.title, roles.salary, departments.name AS department 
      FROM roles 
      JOIN departments ON roles.department_id = departments.id
    `);
    console.table(rows);
    mainMenu();
  }
  
  // View employees
  async function viewEmployees() {
    const { rows } = await db.query(`
      SELECT e.id, e.first_name, e.last_name, roles.title, departments.name AS department, 
             roles.salary, 
             CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employees e
      LEFT JOIN roles ON e.role_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees m ON e.manager_id = m.id
    `);
    console.table(rows);
    mainMenu();
  }
  
  // Add a department 
  async function addDepartment() {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter department name:",
      },
    ]);
  
    await db.query("INSERT INTO departments (name) VALUES ($1)", [name]);
    console.log(chalk.green("Department added!"));
    mainMenu();
  }
  
  // Add a role
  async function addRole() {
    const { rows } = await db.query("SELECT * FROM departments");
    const departmentChoices = rows.map((dept) => ({
      name: dept.name,
      value: dept.id,
    }));
  
    const { title, salary, department_id } = await inquirer.prompt([
      { type: "input", name: "title", message: "Enter role title:" },
      { type: "input", name: "salary", message: "Enter salary:" },
      { type: "list", name: "department_id", message: "Select department:", choices: departmentChoices },
    ]);
  
    await db.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
    console.log(chalk.green("Role added!"));
    mainMenu();
  }

  // Add an employee
  async function addEmployee() {
    const roles = await db.query("SELECT * FROM roles");
    const employees = await db.query("SELECT * FROM employees");
  
    const roleChoices = roles.rows.map((role) => ({ name: role.title, value: role.id }));
    const managerChoices = employees.rows.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      { type: "input", name: "first_name", message: "Enter first name:" },
      { type: "input", name: "last_name", message: "Enter last name:" },
      { type: "list", name: "role_id", message: "Select role:", choices: roleChoices },
      { type: "list", name: "manager_id", message: "Select manager:", choices: managerChoices },
    ]);
  
    await db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [first_name, last_name, role_id, manager_id]);
    console.log(chalk.green("Employee added!"));
    mainMenu();
  }
  
  //Update an employee's role
  async function updateEmployeeRole() {
    const employees = await db.query("SELECT * FROM employees");
    const roles = await db.query("SELECT * FROM roles");
  
    const employeeChoices = employees.rows.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    const roleChoices = roles.rows.map((role) => ({ name: role.title, value: role.id }));
  
    const { employee_id, role_id } = await inquirer.prompt([
      { type: "list", name: "employee_id", message: "Select an employee:", choices: employeeChoices },
      { type: "list", name: "role_id", message: "Select new role:", choices: roleChoices },
    ]);
  
    await db.query("UPDATE employees SET role_id = $1 WHERE id = $2", [role_id, employee_id]);
    console.log(chalk.green("Employee role updated!"));
    mainMenu();
  };


  mainMenu();