const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Express middleware

// Connect to database
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

// request to get all departments

// request to view all roles

// request to view all Employees

// request to add a department?

//  request to add a role

// request to add an employee

// Request to update employee role
