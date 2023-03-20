const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const start = require("./index.js");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the 'employeeTracker_db' database.`)
);

start(db);
