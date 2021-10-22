const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//PARA REGISTRAR UN USUARIO POR PRIMERA VEZ
const registerUser = async (req, res) => {
  //No permitimos que ingrese el rol por primera vez, por defecto es usuario
  if (Object.keys(req.body).includes("rol")) {
    return res.status(403).json({
      code: "ERR",
      message: "Unable to assign a role in the registry",
      success: false,
      data: null,
    });
  }

  //Separamos la contraseña del resto de los datos
  const { password, ...resto } = req.body;

  //Encriptamos la contraseña
  resto.password = bcryptjs.hashSync(password, 10);

  try {
    const user = await User.create(resto);
    return res.status(201).json({
      code: "OK",
      message: null,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      code: "ERR",
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

//PARA HACER EL LOGIN DE UN USUARIO
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //Validamos que el usuario exista y sea correcta la contraseña
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return res.status(400).json({
        code: "AUTH-ERROR",
        message: "Invalid email or password",
        success: false,
        data: null,
      });
    }

    //Creamos un token de ingreso
    const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      code: "OK",
      message: null,
      success: true,
      data: { user, token },
    });
  } catch (error) {
    return res.status(500).json({
      code: "ERR",
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

module.exports = { registerUser, loginUser };
