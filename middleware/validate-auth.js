const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//VALIDAMOS CUANDO SE CARGA UN NUEVO USUARIO
const validateRegister = async (req, res, next) => {
  const schema = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
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

//VALIDAMOS CUANDO HACE LOGIN UN USUARIO
const validateLogin = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
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

//VALIDAMOS EL TOKEN GENERADO EN EL INGRESO
const validateToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  //Verificamos que venga un token por el req
  if (!authorization) {
    return res.status(401).json({
      code: "AUTH ERROR",
      message: "Token authorization must be provided",
      success: false,
      data: null,
    });
  }

  try {
    const token = authorization.split(" ")[1];

    //Validamos que el usuario exista y no se haya eliminado antes de que expire el token
    const { _id } = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(401).send({
        code: "AUTH ERROR",
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(400).json({
      code: "AUTH ERROR",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

//VALIDAMOS EL ROL EN LOS USUARIOS
const validateRolUser = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.rol) || req.user._id == req.params._id) {
      return next();
    }
    return res.status(403).json({
      code: "AUTH-ERR",
      message: "Restricted access",
      success: false,
      data: null,
    });
  };
};

//VALIDAMOS EL ROL EN LA ROPA
const validateRolClothe = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.rol)) {
      return next();
    }
    return res.status(403).json({
      code: "AUTH-ERR",
      message: "Restricted access",
      success: false,
      data: null,
    });
  };
};

module.exports = {
  validateRegister,
  validateLogin,
  validateToken,
  validateRolUser,
  validateRolClothe,
};
