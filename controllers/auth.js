const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar email
    const usuariosDB = await Usuario.findOne({ email });
    if (!usuariosDB) {
      return res.status(404).json({
        ok: false,
        msg: "Correo invalido",
      });
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuariosDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña invalida",
      });
    }
    //Generar el Token

    const token = await generarJWT(usuariosDB.id);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

module.exports = {
  login,
};
