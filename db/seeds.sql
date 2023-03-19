INSERT INTO departments(name)
VALUES ('Human Resources'),
('Sales'),
('Research'),
('Compliance'),
('Customer Support');

INSERT INTO roles(title, salary, departments_id)
VALUES 
("Human Resource Officer", 75000, 1),
("Sales Consultant", 95000, 2),
("Research Analyst", 85000, 3),
("Chief Investment Officer", 135000, 3),
("Chief Compliance Officer", 105000, 4),
("Cusotmer Support Specialist", 65000, 5);



INSERT INTO employees(first_name, last_name, roles_id, manager_id)
VALUES ("Sally", "Smith", 1, null),
("Jenny", "Clark", 3, null),
("Brad", "Billings", 3, 2),
("Jennifer", "Topeka", 5, null),
("Billy", "Montague", 4, null),
("Chad", "Dobbs", 2, null),
("June", "Summers", 2, 6);