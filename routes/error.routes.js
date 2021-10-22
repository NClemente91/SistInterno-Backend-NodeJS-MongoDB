const express = require("express");
const router = express.Router();

//CONTROLLER
const { errorPage } = require("../controllers/error.controller");

//RUTA
router.use(errorPage);

module.exports = router;
