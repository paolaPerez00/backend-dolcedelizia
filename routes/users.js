const { Router } = require('express');

//Se importan los métodos que estan en la ruta indicada en el require, 
//para obtener las funciones que se exportaron en dicho archivo
const {
  getUsers


} = require('../controllers/users');

const router = Router();

//Rutas para acceder a las funciones de la API
//Para las funciones que tienen como parámetros id e idUsuario, hace referencia a id = identidicacion 
//e idUsuario = Id_tipo (tipo de usuario) llave f
router.get('/listaUsuarios', [], getUsers);

module.exports = router;