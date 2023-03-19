const inquirer = require("inquirer");

const start = (db) => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "license",
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
        case "view all departments":
          db.query("sELECT * FROM departments", function (err, results) {
            console.log(results);
            start(db);
          });
          break;

        // return all Employees
        case "view all departments":
          db.query("sELECT * FROM departments", function (err, results) {
            console.log(results);
            start(db);
          });
          break;

        // request to add a department?

        //  request to add a role

        // request to add an employee

        // Request to update employee role
      }
    });
};
// request to get all departments

// request to view all roles

// request to view all Employees

// request to add a department?

//  request to add a role

// request to add an employee

// Request to update employee role
