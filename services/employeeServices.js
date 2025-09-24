const db = require("../database");

function addEmployee({ first_name, last_name, job_title }) {
  const statement = db.prepare;
  ("INSERT INTO employees (first_name, last_name, job_title) VALUES(?,?,?)");
  return statement.run(first_name, last_name, job_title);
}

function getAllEmployees() {
  const statement = db.prepare("SELECT * FROM employees");
  return statement.all();
}

function getEmployeeByID(id) {
  const statement = db.prepare("SELECT * FROM employees WHERE id = ?");
  return statement.get(id);
}

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeByID,
};
