const express = require("express");
const router = express.Router();

//CONTROLLERS
const { registerUser, loginUser } = require("../controllers/auth.controller");

//MIDDLEWARE
const { validateRegister } = require("../middleware/validate-auth");

//RUTAS
router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

module.exports = router;
