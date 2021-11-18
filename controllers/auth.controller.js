const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("../network/response");

//PARA REGISTRAR UN USUARIO POR PRIMERA VEZ
const registerUser = async (req, res) => {
  //No permitimos que ingrese el rol por primera vez, por defecto es usuario
  if (Object.keys(req.body).includes("rol")) {
    return response.error(
      req,
      res,
      "Unable to assign a role in the registry",
      403
    );
  }

  //Separamos la contraseña del resto de los datos
  const { password, ...resto } = req.body;

  //Encriptamos la contraseña
  resto.password = bcryptjs.hashSync(password, 10);

  try {
    const user = await User.create(resto);
    return response.success(req, res, null, 201, user);
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

//PARA HACER EL LOGIN DE UN USUARIO
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //Validamos que el usuario exista y sea correcta la contraseña
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return response.error(req, res, "Invalid email or password", 400);
    }

    //Creamos un token de ingreso
    const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    });

    return response.success(req, res, null, 200, { user, token });
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

module.exports = { registerUser, loginUser };
