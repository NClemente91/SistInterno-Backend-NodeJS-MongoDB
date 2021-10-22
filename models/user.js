const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: false,
      enum: ["administrador", "empleado", "usuario"],
      default: "administrador",
    },
  },
  {
    timestamps: true,
  }
);

//METODO PARA NO MOSTRAR LA CONTRASEÑA
UserSchema.methods.toJSON = function () {
  //Convierte el objeto mongoose a un objeto plano
  const { password, createdAt, updatedAt, __v, ...user } = this.toObject();
  return user;
};

module.exports = model("Users", UserSchema);
