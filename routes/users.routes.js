const express = require("express");
const router = express.Router();

//CONTROLLERS
const {
  getUser,
  putUser,
  deleteUser,
} = require("../controllers/users.controller");

//MIDDLEWARES
const {
  validateIDUser,
  validatePutUser,
} = require("../middleware/validate-users");

const { validateRolUser } = require("../middleware/validate-auth");

//RUTAS
router.get(
  "/:_id",
  [validateRolUser("administrador"), validateIDUser],
  getUser
);

router.put(
  "/:_id",
  [validateRolUser("administrador"), validateIDUser, validatePutUser],
  putUser
);

router.delete(
  "/:_id",
  [validateRolUser("administrador"), validateIDUser],
  deleteUser
);

module.exports = router;
