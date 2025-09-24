const express = require("express");
const router = express.Router();
const path = require("path");

const employeesController = require("../../controller/employeesController");
const {
  handleAddEmployee,
  handleGetAllEmployees,
  handleGetEmployeeById,
} = require("../../controller/employeeSqlController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

//SQL Routes
router.post("/addEmployee", handleAddEmployee);
router.get("/", handleGetAllEmployees);
router.get("/:id", handleGetEmployeeById);

//Local Database routes
const data = {};
data.employees = require("../../model/employees.json");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getSingleEmployee);

module.exports = router;
