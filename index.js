const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "root",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the 'employeeTracker_db' database.`)
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
          db.query("SELECT * FROM roles", function (err, results) {
            console.table(results);
            start();
          });
          break;

        // Return all employees
        case "View all employees":
          db.query("SELECT * FROM employees", function (err, results) {
            console.table(results);
            start();
          });
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
        case "Add a department":
          addDepartment();
          break;
        // Update employee role
        case "Update an employee role":
          addDepartment();
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

const exit = () => {
  process.exit();
};

// start();
module.exports = start;
