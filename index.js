const inquirer = require("inquirer");

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
    fs.writeFile("../README.md", createFile(data), (error) => {
      error ? console.log("error") : console.log("Creating your file now.");
    });
  });
