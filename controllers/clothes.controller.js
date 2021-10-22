const Clothe = require("../models/clothe");

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
    return res.status(200).json({
      code: "OK",
      message: null,
      success: true,
      data: { count, clothes },
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

//PARA MOSTRAR UNA PRENDA DE ROPA
const getClothe = async (req, res) => {
  try {
    const clothe = await Clothe.findById(req.params._id);
    if (!clothe) {
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
      data: clothe,
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

//PARA AGREGAR UNA PRENDA DE ROPA
const postClothe = async (req, res) => {
  try {
    const clothe = await Clothe.create(req.body);
    return res.status(201).json({
      code: "OK",
      message: null,
      success: true,
      data: clothe,
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

//PARA MODIFICAR UNA PRENDA DE ROPA
const putClothe = async (req, res) => {
  try {
    const clothe = await Clothe.findOneAndUpdate(
      { _id: req.params._id },
      { ...req.body },
      { new: true }
    );
    if (!clothe) {
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
      data: clothe,
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

//PARA ELIMINAR UNA PRENDA DE ROPA
const deleteClothe = async (req, res) => {
  try {
    const clotheDelete = await Clothe.deleteOne({ _id: req.params._id });
    if (clotheDelete.n === 0) {
      return res.status(404).json({
        code: "NOT-FOUND",
        message: "Not Found",
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
  getAllClothes,
  getClothe,
  postClothe,
  putClothe,
  deleteClothe,
};
