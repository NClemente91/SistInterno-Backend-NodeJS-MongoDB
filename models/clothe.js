const { Schema, model } = require("mongoose");

const ClotheSchema = Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ["buzo", "remera", "campera", "pantalón"],
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//METODO PARA NO MOSTRAR LA CONTRASEÑA
ClotheSchema.methods.toJSON = function () {
  //Convierte el objeto mongoose a un objeto plano
  const { createdAt, updatedAt, __v, ...clothe } = this.toObject();
  return clothe;
};

module.exports = model("Clothes", ClotheSchema);
