const Joi = require("joi");

//VALIDAMOS LO QUE NOS VIENE POR EL ID
const validateIDUser = async (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.params);
    return next();
  } catch (error) {
    return res.status(400).json({
      code: "VALIDATION ERROR",
      message: error.details[0].message,
      success: false,
      data: null,
    });
  }
};

//VALIDAMOS CUANDO SE MODIFICA UN USUARIO
const validatePutUser = async (req, res, next) => {
  //Suponemos que el email del usuario es único, lo demás puede cambiar
  const schema = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    password: Joi.string(),
    rol: Joi.string().valid("administrador", "empleado", "usuario"),
  });

  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({
      code: "VALIDATION ERROR",
      message: error.details[0].message,
      success: false,
      data: null,
    });
  }
};

module.exports = { validateIDUser, validatePutUser };
