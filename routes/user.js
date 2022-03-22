const { Router } = require('express');

//Se importan los métodos que estan en la ruta indicada en el require, 
//para obtener las funciones que se exportaron en dicho archivo
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  typeUser

} = require('../controllers/user');

const router = Router();

//Rutas para acceder a las funciones de la API
//Para las funciones que tienen como parámetros id e idUsuario, hace referencia a id = identidicacion 
//e idUsuario = Id_tipo (tipo de usuario) llave foránea
router.get('/user/:id/:idUsuario', [], getUser); 
router.get('/listaUsuarios', [], getUsers);
router.post('/registroCliente', [], createUser);
router.put('/user/:id/:idUsuario', [], updateUser);
router.delete('/eliminarUsuario/:id', [], deleteUser);
router.post('/loginUsuario', [], loginUser);
router.get('/tipoUsuario', [],typeUser);


module.exports = router;