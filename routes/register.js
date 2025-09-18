//Imports
const express = require("express");
const router = express.Router();
const reigisterController = require("../controller/registerController");

//route
router.post("/", reigisterController.handleNewUser);

module.exports = router;
