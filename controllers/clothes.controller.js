const Clothe = require("../models/clothe");
const response = require("../network/response");

//PARA MOSTRAR TODAS LAS PRENDAS DE ROPA
const getAllClothes = async (req, res) => {
  //Paginado
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const count = await Clothe.countDocuments();
    const clothes = await Clothe.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex);
    return response.success(req, res, null, 200, { count, clothes });
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

//PARA MOSTRAR UNA PRENDA DE ROPA
const getClothe = async (req, res) => {
  try {
    const clothe = await Clothe.findById(req.params._id);

    if (!clothe) {
      return response.error(req, res, "Not Found", 404);
    }

    return response.success(req, res, null, 200, clothe);
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

//PARA AGREGAR UNA PRENDA DE ROPA
const postClothe = async (req, res) => {
  try {
    const clothe = await Clothe.create(req.body);
    return response.success(req, res, null, 201, clothe);
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

//PARA MODIFICAR UNA PRENDA DE ROPA
const putClothe = async (req, res) => {
  try {
    const clothe = await Clothe.findOneAndUpdate(
      { _id: req.params._id },
      { ...req.body },
      { new: true }
    );
    if (!clothe) {
      return response.error(req, res, "Not Found", 404);
    }
    return response.success(req, res, null, 200, clothe);
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

//PARA ELIMINAR UNA PRENDA DE ROPA
const deleteClothe = async (req, res) => {
  try {
    const clotheDelete = await Clothe.deleteOne({ _id: req.params._id });
    if (clotheDelete.n === 0) {
      return response.error(req, res, "Not Found", 404);
    } else {
      return response.success(req, res, null, 200, null);
    }
  } catch (error) {
    return response.error(req, res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllClothes,
  getClothe,
  postClothe,
  putClothe,
  deleteClothe,
};
