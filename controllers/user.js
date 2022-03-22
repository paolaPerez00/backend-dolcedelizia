const { response } = require('express');
var userConnection = require('../database/user');



//Función para crear un nuevo usuario en la BD
const createUser = async (req, res = response) => {
  try {
    //Datos obtenidos a través de la acción POST, tomando los campos del frontend
    //IMPORTANTE: Tener en cuenta que estos campos se deben llamar igual a como estan definidos a continuación
    const {
      identificacion,
      Id_tipo,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      usuario,
      contrasena,
      direccion,
      telefono,
      email
    } = req.body;

    //Consulta para guardar en la BD, en la tabla user
    

    const connection = userConnection();
    connection.query(
      "INSERT INTO Usuario (identificacion,Id_tipo,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,usuario,contraseña,direccion,telefono,email) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [identificacion,Id_tipo,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,usuario,contrasena,direccion,telefono,email],
      function (err, results, fields) {
        
        if (err) {
          console.log(err);
          //Error con la base de datos
          return res.status(500).json({
            success: false,
            result: err,
          });
        } else{
          
          //Respuesta de la petición

         
          return res.status(200).json({
            success: true,
            result: results,
          });

          

        }
      }
    );
    //Se cierra la conexión con la BD
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
const getUser = async (req, res = response) => {
  try {
    //Son lo parámetros que se le envían a la petición para identificar que registro buscar
    const {
      id, //Identificación del usuario
      idUsuario, //tipo usuario
    } = req.params;
    //Consulta a ejecutar
    var SQLSearch =  'SELECT * FROM Usuario '
    SQLSearch += '  WHERE identificacion = '+ id  + ' AND Id_tipo = '+idUsuario+';';
    console.log(SQLSearch)
    const connection = userConnection();
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

//Buscar los usuarios existentes
const getUsers = async (req, res = response) => {
  try {
    const connection = userConnection();
    connection.query(
      'SELECT * FROM Usuario;',
      function (err, results, fields) {
        if (err) {
          console.log(err)
          //Error al ejecutar la consulta 
          return res.status(500).json({
            success: false,
            result: err,
          });
        } else {
      

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
const updateUser = async (req, res = response) => {
  try {
    //Los datos a actualizar
    const {
      identificacion,
      Id_tipo,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      usuario,
      contrasena,
      direccion,
      telefono,
      email
    } = req.body;

    //Son lo parámetros que se le envían a la petición para identificar que registro modificar
    const {
      id, //Identificación del usuario, en dado caso que la quiera modificar se guarda para poder realizar la actualización
      idUsuario, //tipo usuario
    } = req.params;
    //Consulta a ejecutar
    var SQLUpdate =  'UPDATE usuario SET '
    SQLUpdate += 'identificacion = ' + identificacion + ', ' 
    SQLUpdate += ' Id_tipo = ' + Id_tipo + ', ' 
    SQLUpdate += ' primer_nombre = \'' + primer_nombre + '\', ' 
    SQLUpdate += ' segundo_nombre = \'' + segundo_nombre + '\', ' 
    SQLUpdate += ' primer_apellido = \'' + primer_apellido + '\', ' 
    SQLUpdate += ' segundo_apellido = \'' + segundo_apellido + '\', ' 
    SQLUpdate += ' usuario = \'' + usuario + '\', ' 
    SQLUpdate += ' contrasena = \'' + contrasena + '\', ' 
    SQLUpdate += ' direccion = \'' + direccion + '\', ' 
    SQLUpdate += ' telefono =' + telefono + ', ' 
    SQLUpdate += ' email = \'' + email + "\' "
    SQLUpdate += '  WHERE identificacion = '+ id  + ' AND Id_tipo = '+idUsuario+';';

    const connection = userConnection();
    connection.query(
      SQLUpdate,
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
const deleteUser = async (req, res = response) => {
  try {
    //Son lo parámetros que se le envían a la petición para identificar que registro borrar
    const {
      id, //Identificación del usuario
      idUsuario, //tipo usuario
    } = req.params;
    //Consulta a ejecutar
    var SQLDelete =  'DELETE FROM usuario WHERE identificacion = ? ;';
     
    console.log(id)
    const connection = userConnection();
    connection.query(
      "DELETE FROM Usuario WHERE identificacion = ? ;",[id],
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

//Método para el login
const loginUser = async (req, res = response) => {
  try {
    //Son lo parámetros que se le envían a la petición para verificar las credenciales del usuario al loguearse
    const user= req.body.user;
    const contrasena= req.body.password;
    //Consulta a ejecutar
    

    const connection = userConnection();
    connection.query(
      "SELECT * from Usuario where usuario=? AND contraseña=?;",
        [user,contrasena],
      function (err, results, fields) {
        
        if (err) {
          //Error con la base de datos
          console.log(err);
          return res.status(500).json({
            success: false,
            result: err,
          });
          
        } 
        
        if(results.length > 0) {
          //Resultado de la consulta
          /*return res.status(200).json({
            success: true,
            results
          });*/
          //console.log("hola");
          res.json({
            auth:true,
            user:user,
            typeuser:results[0].Id_tipo,
            iduser:results[0].identificacion
            //token:accessToken,
        })
        //res.send(result);
            }
            else{
                res.json({auth:false,message:"Credenciales incorrectas"});
            }
        }
      
    );
  

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

//Método para consultar los tipos de usuarios
const typeUser = async (req, res = response) => {
  try {
    //Consulta a ejecutar
    var SQLTipoUsuario =  'SELECT * FROM tipousuario; ';

    const connection = userConnection();
    connection.query(
      SQLTipoUsuario,
      function (err, results, fields) {
        if (err) {
          //Error con la base de datos
          return res.status(500).json({
            success: false,
            result: err,
          });
        } else {
          //Resultado de la consulta
          res.send(results);
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

//Se exportan las funciones definidas en la API (CRUD) y funciones para login, buscar tipo de usuario
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  typeUser
};