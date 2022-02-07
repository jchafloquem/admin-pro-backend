const { Schema, model } = require("mongoose");

//Creacion del Schema Medico

const MedicoSchema = Schema({
  nombre: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
}
});

//Metodo funcion para filtrar objetos del registro usuario

MedicoSchema.method("toJSON", function () {
  //ocultar campos
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Medico", MedicoSchema);
