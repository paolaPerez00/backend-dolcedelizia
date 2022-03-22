const { Router } = require('express');

//Se importan los métodos que estan en la ruta indicada en el require, 
//para obtener las funciones que se exportaron en dicho archivo
const {
  
  getOrders,
  createOrder,
  DescOrder,
  deleteOrder,
  sendOrder
  

} = require('../controllers/order');

const router = Router();

//Rutas para acceder a las funciones de la API
//Para las funciones que tienen como parámetros id e idUsuario, hace referencia a id = identidicacion 
//e idUsuario = Id_tipo (tipo de usuario) llave foránea

router.get('/listaPedidos', [], getOrders);
router.post('/descripcionPedido', [], DescOrder);
router.post('/registroPedido', [], createOrder);
router.post('/cambiarEstado', [], sendOrder);
router.delete('/eliminarUsuario/:id', [], deleteOrder);



module.exports = router;