const { Schema, model } = require("mongoose");

//Creacion del Schema Usuario

const HospitalSchema = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "hospitales" }
);

//Metodo funcion para filtrar objetos del registro usuario

HospitalSchema.method("toJSON", function () {
  //ocultar campos
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", HospitalSchema);
