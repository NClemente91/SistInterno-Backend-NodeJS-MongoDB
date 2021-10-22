const Joi = require("joi");

//VALIDAMOS LO QUE NOS VIENE POR EL ID
const validateIDClothe = async (req, res, next) => {
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

//VALIDAMOS CUANDO SE CARGA UNA ROPA
const validatePostClothe = async (req, res, next) => {
  const schema = Joi.object({
    tipo: Joi.string()
      .required()
      .valid("buzo", "remera", "campera", "pantalón"),
    cantidad: Joi.number().required(),
    precio: Joi.number().positive().required(),
    descripcion: Joi.string().required(),
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

//VALIDAMOS CUANDO SE MODIFICA UNA ROPA
const validatePutClothe = async (req, res, next) => {
  //Suponemos que el tipo de prenda no se puede cambiar, en ese caso cargar una nueva
  const schema = Joi.object({
    cantidad: Joi.number(),
    precio: Joi.number().positive(),
    descripcion: Joi.string(),
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

module.exports = { validateIDClothe, validatePostClothe, validatePutClothe };
