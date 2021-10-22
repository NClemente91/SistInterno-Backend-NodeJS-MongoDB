const express = require("express");
const router = express.Router();

//CONTROLLERS
const {
  getAllClothes,
  getClothe,
  postClothe,
  putClothe,
  deleteClothe,
} = require("../controllers/clothes.controller");

//MIDDLEWARES
const {
  validateIDClothe,
  validatePostClothe,
  validatePutClothe,
} = require("../middleware/validate-clothes");

const { validateRolClothe } = require("../middleware/validate-auth");

//RUTAS
router.get("/", getAllClothes);

router.get("/:_id", validateIDClothe, getClothe);

router.post(
  "/",
  [validateRolClothe("administrador", "empleado"), validatePostClothe],
  postClothe
);

router.put(
  "/:_id",
  [
    validateRolClothe("administrador", "empleado"),
    validateIDClothe,
    validatePutClothe,
  ],
  putClothe
);

router.delete(
  "/:_id",
  [validateRolClothe("administrador", "empleado"), validateIDClothe],
  deleteClothe
);

module.exports = router;
