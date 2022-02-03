const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const res = require("express/lib/response");
const { generarJWT } = require("../helpers/jwt");

//Cargar los Usuarios
const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");
  res.json({
    ok: true,
    usuarios,
    uid: req.uid
  });
};

//Crear los usuarios
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }
    const usuario = new Usuario(req.body);
    //Encriptar contraseñas o password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Grabar usuario
    await usuario.save();

    //Generar el Token JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
const actualizarUsuario = async (req, res = response) => {
  //TODO: Validar token y comprobar si es el usuario correcto
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario por el ID",
      });
    }

    //Actualizaciones
    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con el correo ingresado",
        });
      }
    }
    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar usuario",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario por el ID",
      });
    }
    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: 'Usuario eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      oh: false,
      msg: "Contactese con el administrador",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
