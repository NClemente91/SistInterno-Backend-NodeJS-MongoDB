const User = require("../models/user");
const response = require("../network/response");

//PARA MOSTRAR UN USARIO
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return response.error(req, res, "Not Found", 404);
    }
    return response.success(req, res, null, 200, user);
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

//PARA ACTUALIZAR UN USUARIO
const putUser = async (req, res) => {
  //No permitimos el usuario del token si no es administrador, cambie el rol
  if (
    Object.keys(req.body).includes("rol") &&
    req.user.rol !== "administrador"
  ) {
    return response.error(req, res, "Unable to assign a new role", 403);
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params._id },
      { ...req.body },
      { new: true }
    );
    if (!user) {
      return response.error(req, res, "Not Found", 404);
    }
    return response.success(req, res, null, 200, user);
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

//PARA ELIMINAR UN USUARIO
const deleteUser = async (req, res) => {
  try {
    const userDelete = await User.deleteOne({ _id: req.params._id });
    if (userDelete.n === 0) {
      return response.error(req, res, "Not Found", 404);
    } else {
      return response.success(req, res, null, 200, null);
    }
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

module.exports = {
  getUser,
  putUser,
  deleteUser,
};
