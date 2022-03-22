const { response } = require('express');
const productConnection = require('../database/user');


//Función para crear un nuevo producto en la BD y asociarlo al invetario
const createProduct = async (req, res = response) => {
  try {
    //Datos obtenidos a través de la acción POST, tomando los campos del frontend
    //IMPORTANTE: Tener en cuenta que estos campos se deben llamar igual a como estan definidos a continuación
    const {
      nombre,
      valor_unitario,
      descripcion,
      cantidad, 
      categoria 
    } = req.body;
    const porcentaje_descuento = '0.10'




    //Consulta para guardar en la BD, en la tabla producto
    
    const connection = productConnection();

        connection.query(

          'INSERT INTO Producto(nombre,valor_unitario,descripcion,cantidad,porcentaje_descuento,Id_tipo) values (?,?,?,?,?,?)',
          [nombre,valor_unitario,descripcion,cantidad,porcentaje_descuento ,categoria],

          function (err, results, fields) {
            
            if (err) {
              console.log(err);
              //Error con la base de datos
              return res.status(500).json({
                success: false,
                result: err,
              });
            } else {
                
              //Respuesta de la petición
              return res.status(200).json({
                success: true,
                result: results
              });
    
            }
          }
        );

    //Se cierra la conexión con la BD, al guardar el producto
    connection.end();   

  } catch (e) {
    console.log(e);
    //En caso de fallos se retorna el error 
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};


//Buscar un solo registro de la tabla de usuarios
const getProduct = async (req, res = response) => {
  try {
    //Son lo parámetros que se le envían a la petición para identificar que registro buscar
    const {
      id, //Identificador del producto (id_producto)
       //tipo de producto (Id_tipo) llave foránea
    } = req.body;
    //Consulta a ejecutar
    var SQLSearch =  'SELECT * FROM Producto '
     +'  WHERE id_producto = '+ id  + ';';

    const connection = productConnection();
    connection.query(
      SQLSearch,
      function (err, results, fields) {
        
        if (err) {
          //Error con la base de datos
          return res.status(500).json({
            success: false,
            result: err,
          });
        } else {
          //Resultado de la consulta
          return res.status(200).json({
            success: true,
            result:results
          });
        }
      }
    );
    connection.end();

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

//Buscar los usuarios existentes
const getProducts = async (req, res = response) => {
  try {
    const connection = productConnection();
    var query='select p.id_producto, p.nombre,p.descripcion,p.valor_unitario,p.cantidad,p.porcentaje_descuento,i.nombre as categoria , p.Id_tipo from Producto p '

    query += 'inner join TipoProducto i ' 
    
   query+=  'on p.Id_tipo=i.Id_tipo ;'
    connection.query(
      query,
      function (err, results, fields) {
        
        if (err) {
          
          //Error al ejecutar la consulta 
          return res.status(500).json({
            success: false,
            result: err,
          });
        } else {
          //
          
          res.send(results);
          
        }
      }
    );
    connection.end();

    //Errores 
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

//Actualizar los usuarios existentes
const updateProduct = async (req, res = response) => {
  try {
    //Los datos a actualizar
    const {
      nombre,
      valor_unitario,
      descripcion,
      cantidad,
      categoria,
      id_producto
    } = req.body;

    
    

    const connection = productConnection();
    connection.query(
      'UPDATE Producto SET '
    +' nombre =?, ' 
    + ' valor_unitario =?, ' 
    +' descripcion = ?, ' 
    +' cantidad = ?, ' 
   
    +' Id_tipo = ?' 
    +'  WHERE id_producto = ?;',
      [nombre,valor_unitario,descripcion,cantidad,categoria,id_producto],
      function (err, results, fields) {
        if (err) {
          console.log(err)
          //Error con la base de datos
          return res.status(500).json({
            success: false,
            result: err,
          });
        } else {
          //Resultado de la consulta
          return res.status(200).json({
            success: true,
            results
          });
        }
      }
    );
    connection.end();

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

//Borrar un registro de la tabla de usuarios
const deleteProduct = async (req, res = response) => {
  try {
    //Son lo parámetros que se le envían a la petición para identificar que registro borrar
    const {
      idProduct, //Identifidor (id) del producto
      
    } = req.params;
    //Consulta a ejecutar
    var SQLDelete =  'DELETE FROM Producto '
    SQLDelete += '  WHERE id_producto = '+ idProduct +';';

    const connection = productConnection();
    connection.query(
      SQLDelete,
      function (err, results, fields) {
        
        if (err) {
          console.log(err)
          //Error con la base de datos
          return res.status(500).json({
            success: false,
            result: err,

          });
        } else {
          //Resultado de la consulta
          return res.status(200).json({
            success: true,
            results
          });
        }
      }
    );
    connection.end();

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

//Método para consultar los tipos de productos
const typeProduct = async (req, res = response) => {
  try {
    //Consulta a ejecutar
    var SQLTipoProducto =  'SELECT * FROM TipoProducto; ';

    const connection = productConnection();
    connection.query(
      SQLTipoProducto,
      function (err, results, fields) {

        
        if (err) {
          //Error con la base de datos
          return res.status(500).json({
            success: false,
            result: err,
          });
        } else {
          res.send(results)
        }
      }
    );
    connection.end();

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

//Se exportan las funciones definidas en la API (CRUD) y buscar tipo de producto
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  typeProduct
};