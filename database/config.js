const mongoose = require("mongoose");

//crear funcion para la conexion
const dbConection = async () => {
  try {
    await mongoose.connect(process.env.BD_CNN);
    console.log('BD OnLine');
  } catch (error) {
    console.log(error);
    throw new Error("Error en la conexion de la Base de datos");
  }
};

module.exports = {
    dbConection
}