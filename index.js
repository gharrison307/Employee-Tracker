const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "",
    database: "employeeTracker_db",
  }
  // console.log(`Connected to the 'employeeTracker_db' database.`)
);

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "selection",
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
    ])
    .then((data) => {
      switch (data.selection) {
        // return all departments
        case "View all departments":
          db.query("SELECT * FROM departments", function (err, results) {
            console.table(results);
            start();
          });
          break;

        // Return all roles
        case "View all roles":
          db.query(
            "SELECT roles.id, roles.title, roles.salary, departments.name as departments FROM roles JOIN departments ON roles.departments_id = departments.id",
            function (err, results) {
              console.table(results);
              start();
            }
          );
          break;

        // Return all employees
        case "View all employees":
          db.query(
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN departments ON roles.departments_id = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id`,
            function (err, results) {
              console.table(results);
              start();
            }
          );
          break;

        // Add a department
        case "Add a department":
          addDepartment();
          break;

        // Add a role
        case "Add a role":
          addRole();
          break;
        // Add an employee
        case "Add an employee":
          addEmployee();
          break;
        // Update employee role
        case "Update an employee role":
          updateEmployee();
          break;

        // Exit the program
        case "Exit":
          exit();
          break;
      }
    });
}

// Add a department function
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Department you would like to add?",
        name: "departmentName",
      },
    ])
    .then((input) => {
      db.query(
        `INSERT INTO departments (name) VALUES (?)`,
        input.departmentName,
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log("The new department has been added.");
          start();
        }
      );
    });
};

// Add a role
const addRole = () => {
  db.query("SELECT id as value, name FROM departments", (err, results) => {
    err ? console.log(err) : console.log("/n");

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the Role you would like to add?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary of the new role?",
          name: "salary",
        },
        {
          type: "list",
          message: "To which department does this new role belong?",
          name: "departments_id",
          choices: results,
        },
      ])
      .then(({ title, salary, departments_id }) => {
        db.query(
          `INSERT INTO roles (title, salary, departments_id) VALUES ("${title}", "${salary}", "${departments_id}")`,
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log("The new role has been added.");
            start();
          }
        );
      });
  });
};

// Add an employee function
const addEmployee = () => {
  // query roles
  db.query(
    "SELECT id AS value, title AS name FROM roles",
    (err, roleResults) => {
      err ? console.log(err) : console.log("/n");

      console.log(roleResults);

      // query managers
      db.query(
        `SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employees WHERE manager_id is null`,
        (err, managerResults) => {
          err ? console.log(err) : console.log("/n");

          console.table(managerResults);

          inquirer
            .prompt([
              {
                type: "input",
                message: "What is the first name of the new employee?",
                name: "first_name",
              },
              {
                type: "input",
                message: "What is the last name of the new employee?",
                name: "last_name",
              },
              {
                type: "list",
                message: "What is the role of the new employee?",
                name: "roles_id",
                choices: roleResults,
              },
              {
                type: "list",
                message: "Who is the manager of the new employee?",
                name: "manager_id",
                choices: managerResults,
              },
            ])
            .then(({ first_name, last_name, roles_id, manager_id }) => {
              db.query(
                `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("${first_name}", "${last_name}", "${roles_id}", "${manager_id}")`,
                (err, results) => {
                  if (err) {
                    throw err;
                  }
                  console.log("The new employee has been added.");
                  start();
                }
              );
            });
        }
      );
    }
  );
};

// Update an Employee
const updateEmployee = () => {
  // query employees
  db.query(
    `SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employees`,
    (err, employeeResults) => {
      console.log(employeeResults);
      // query roles
      db.query(
        `SELECT id AS value, title AS name FROM roles`,
        (err, rolesResults) => {
          console.log(rolesResults);

          inquirer
            .prompt([
              {
                type: "list",
                message: "Which employee's role would you like to change?",
                name: "id",
                choices: employeeResults,
              },
              {
                type: "list",
                message:
                  "To which department would you like to move this employee?",
                name: "roles_id",
                choices: rolesResults,
              },
            ])
            .then(
              ({ id, roles_id }) =>
                db.query(
                  `UPDATE employees SET roles_id VALUE ("${roles_id}"),)`
                ),
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log("The role has been updated.");
                start();
              }
            );
        }
      );
    }
  );
};

// Exit function
const exit = () => {
  process.exit();
};

// start();
module.exports = start;
