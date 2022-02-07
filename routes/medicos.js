/*
Medicos
Ruta : /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getMedico,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");

const router = Router();
//Rutas
router.get("/", getMedico);

router.post("/", [
  validarJWT,
    check("nombre", "El nombre del Medico es necesario").not().isEmpty(),
    check("hospital", "El hospital ID debe de ser valido").isMongoId(),
    validarCampos,
], crearMedico);

//Actualizar usuario
router.put("/:id", [], actualizarMedico);

//Borrar usuario
router.delete("/:id", borrarMedico);

//Exportar modulo router
module.exports = router;
