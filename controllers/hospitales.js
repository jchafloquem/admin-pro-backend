const { response } = require("express");

const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {

  const hospitales = await Hospital.find()
                                    .populate('usuario','nombre')


  res.json({
    oh: true,
    hospitales,
  });
};

const crearHospitales = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      oh: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

const actualizarHospitales = (req, res = response) => {
  res.json({
    oh: true,
    msg: "actualizarHospitales",
  });
};

const borrarHospitales = (req, res = response) => {
  res.json({
    oh: true,
    msg: "borrarHospitales",
  });
};

module.exports = {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  borrarHospitales,
};
