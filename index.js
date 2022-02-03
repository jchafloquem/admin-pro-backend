require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConection } = require("./database/config");

//Creando el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del Body
app.use(express.json());

//Base de datos
dbConection();

//Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto:" + process.env.PORT);
});
