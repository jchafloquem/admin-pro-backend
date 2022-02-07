const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizarimagen");
const { response } = require("express");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un médico, usuario u hospital (tipo)",
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No existe ningún archivo",
    });
  }

  //Procesar la imagen
  const file = req.files.imagen; //conforme pones el nonmre de la variable en el body

  const nombreCortado = file.name.split("."); //nombre.1.3.jpg
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //Validar extension
  const extensionesValidas = ["jpg", "png", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extension valida",
    });
  }

  //Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`; //nombre con el uuid y la extension del archivo

  //Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al mover imagen",
      });
    }
    //Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "Archivo cargado",
      nombreArchivo,
    });
  });
};

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  retornaImagen,
};
