const { Schema, model } = require("mongoose");

//Creacion del Schema Usuario
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});
//Metodo funcion para filtrar objetos del registro usuario
UsuarioSchema.method("toJSON", function () {
  //ocultar campos
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Usuario", UsuarioSchema);
