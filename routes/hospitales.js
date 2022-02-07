/*
Hospitales
Ruta : /api/hopitales
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  borrarHospitales,
} = require("../controllers/hospitales");

const router = Router();
//Rutas
router.get("/", getHospitales);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del Hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospitales
);

//Actualizar usuario
router.put("/:id", [], actualizarHospitales);

//Borrar usuario
router.delete("/:id", borrarHospitales);

//Exportar modulo router
module.exports = router;
