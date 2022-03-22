const { response } = require('express');
var userConnection = require('../database/user');

const getUsers = async (req, res = response) => {
    try {
      const connection = userConnection();
      connection.query(
        'SELECT * FROM Usuario;',
        function (err, results, fields) {
          if (err) {
            //Error al ejecutar la consulta 
            return res.status(500).json({
              success: false,
              result: err,
            });
          } else {
              return res.status(200).json({
                  success: false,
                  result: results,
                }); 
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

module.exports = {
    getUsers,
  };