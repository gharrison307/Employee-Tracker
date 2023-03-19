const inquirer = require("inquirer");

const start = (db) => {
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
        ],
      },
    ])
    .then((data) => {
      switch (data.selection) {
        // return all departments
        case "View all departments":
          db.query("SELECT * FROM departments", function (err, results) {
            console.log(results);
            start(db);
          });
          break;

        // return all roles
        case "View all roles":
          db.query("SELECT * FROM roles", function (err, results) {
            console.log(results);
            start(db);
          });
          break;

        // return all employees

        // request to add a department?

        //  request to add a role

        // request to add an employee

        // Request to update employee role
      }
    });
};

module.exports = start;
