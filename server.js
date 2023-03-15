const inquirer = require("inquirer");
const mysql = require("mysql2");

// Express middleware

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "",
    database: "",
  },
  console.log(`Connected to the XXXXXXX database.`)
);
