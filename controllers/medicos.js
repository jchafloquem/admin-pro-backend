const { response } = require("express");

const Medico = require('../models/medicos')

const getMedico = async (req, res = response) => {

  const medicos = await Medico.find()
                                    .populate('usuario','nombre')
                                    .populate('hospital','nombre')
  res.json({
    oh: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {

  const uid = req.uid;
  const medico = Medico({
    usuario: uid,
    ...req.body
  });

  try {
    const medicoDB = await medico.save();
    res.json({
      oh: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

const actualizarMedico = (req, res = response) => {
  res.json({
    oh: true,
    msg: "actualizarMedico",
  });
};

const borrarMedico = (req, res = response) => {
  res.json({
    oh: true,
    msg: "borrarMedico",
  });
};

module.exports = {
  getMedico,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
