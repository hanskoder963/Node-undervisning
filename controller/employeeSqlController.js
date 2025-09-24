const {
  addEmployee,
  getAllEmployees,
  getEmployeeByID,
} = require("../services/employeeServices");

const handleAddEmployee = (req, res) => {
  if (!first_name || !last_name || !job_title) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const result = addEmployee({ first_name, last_name, job_title });
    res.status(201).json({
      message: "Employee added successfully",
      employee: {
        id: result.lastInsertRowid,
        first_name,
        last_name,
        job_title,
      },
    });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Failed to add employee" });
  }
};

const handleGetAllEmployees = (req, res) => {
  try {
    const employees = getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Failed to get employees" });
  }
};

const handleGetEmployeeById = (req, res) => {
  const { id } = req.param;
  try {
    const employee = getEmployeeByID(id);
    if (!employee) {
      return res
        .status(404)
        .json({ error: "Could not find employee with that ID" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Failed to get employee" });
  }
};

module.exports = {
  handleAddEmployee,
  handleGetAllEmployees,
  handleGetEmployeeById,
};
