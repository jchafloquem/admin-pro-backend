const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-verify");

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
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);
    //
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      //Si no existe el usuario
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      //Si existe
      usuario = usuarioDB;
      usuario.google = true;
      //usuario.password = "@@@";
    }

    //Guardar el usuario
    await usuario.save();

    //Generar el Token - JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: " Token incorrecto",
      googleToken,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
