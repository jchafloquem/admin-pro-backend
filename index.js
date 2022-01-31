require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConection } = require("./database/config");

//Creando el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
dbConection();

//Rutas
app.get("/", (requerir, respuesta) => {
  respuesta.status(400).json({
    ok: true,
    msg: "Hola Mundo Jorgito",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto:" + process.env.PORT);
});
