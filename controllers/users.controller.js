const User = require("../models/user");

//PARA MOSTRAR UN USARIO
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({
        code: "NOT-FOUND",
        message: "Not Found",
        success: false,
        data: null,
      });
    }
    return res.status(200).json({
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

//PARA ACTUALIZAR UN USUARIO
const putUser = async (req, res) => {
  //No permitimos el usuario del token si no es administrador, cambie el rol
  if (
    Object.keys(req.body).includes("rol") &&
    req.user.rol !== "administrador"
  ) {
    return res.status(403).json({
      code: "ERR",
      message: "Unable to assign a new role",
      success: false,
      data: null,
    });
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params._id },
      { ...req.body },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        code: "NOT-FOUND",
        message: "Not Found",
        success: false,
        data: null,
      });
    }
    return res.status(200).json({
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

//PARA ELIMINAR UN USUARIO
const deleteUser = async (req, res) => {
  try {
    const userDelete = await User.deleteOne({ _id: req.params._id });
    if (userDelete.n === 0) {
      return res.status(404).json({
        code: "NOT-FOUND",
        message: "User does not exist",
        success: false,
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "OK",
        message: null,
        success: true,
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: "ERR",
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

module.exports = {
  getUser,
  putUser,
  deleteUser,
};
