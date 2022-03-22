const { response } = require('express');
var userConnection = require('../database/user');


const createOrder = async (req, res = response) => {
    try {
    const {
        id_usuario,
        productos,
        total,
      } = req.body;
  
      //Consulta para guardar en la BD, en la tabla user
      
  
      const connection = userConnection();
      connection.query(
        "INSERT INTO Factura (fecha,total,id_usuario) VALUES(Now(),?,?)",
        [total,id_usuario],
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

    connection.query(
        "INSERT INTO ServicioDomicilio(estado,id_factura) "+
        "values(false,(select id_factura from Factura where id_usuario=? ORDER BY id_factura DESC LIMIT 1 ))",
        [id_usuario],
        
      );

      for(const product of productos){

        connection.query(
            "INSERT INTO detallefactura(cantidad,id_producto,id_factura)"+
            "values(?,?,(select id_factura from Factura where id_usuario=? ORDER BY id_factura DESC LIMIT 1 ));",
            [product.amount,product.id,id_usuario,product.id])

        connection.query( "UPDATE Producto set cantidad=cantidad-"+product.amount+" where id_producto=? "
      ,            [product.id],
                  function (err, results, fields){
                    if(err){
                      console.log(err)
                    }
                  })
      }

      
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

    



}

const getOrders = async (req, res = response) => {
    try {

        const connection = userConnection();
        connection.query(
        "SELECT u.primer_nombre,u.segundo_nombre,u.primer_apellido,u.segundo_apellido,u.direccion,s.id_pedido,s.estado,f.id_factura,f.total "
         +",f.fecha from ServicioDomicilio s " 
        +"INNER JOIN Factura f on s.id_factura =f.id_factura "
        +"INNER JOIN Usuario u on f.id_usuario=u.identificacion"
        ,
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
        connection.end();

    } catch (e) {
        console.log(e);
        //En caso de fallos se retorna el error 
        return res.status(500).json({
          success: false,
          message: e.message
        });
      }
  

    

}

const DescOrder= async (req, res = response) => {

    

    try{

        const{

            id_factura
        }=req.body

        const connection = userConnection();
        connection.query("SELECT d.cantidad,p.nombre FROM detallefactura d " 
        +"inner join Factura f on d.id_factura=f.id_factura " 
        +"inner join Producto p on d.id_producto=p.id_producto "
        +"where d.id_factura=?" ,[id_factura],
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

        )
        connection.end();

    }catch (e) {
        console.log(e);
        //En caso de fallos se retorna el error 
        return res.status(500).json({
          success: false,
          message: e.message
        });

    }

}
const deleteOrder = async (req, res = response)=>{

}

const sendOrder = async (req, res = response)=>{

  try{

    const {

      id_pedido
    }=req.body

    const connection = userConnection();
    connection.query("UPDATE ServicioDomicilio SET estado=? WHERE id_pedido=?",
    ["1",id_pedido], 
    function(err, results, fields){

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


    })

  }catch (e) {
    console.log(e);
    //En caso de fallos se retorna el error 
    return res.status(500).json({
      success: false,
      message: e.message
    });

}

}


module.exports = {
    createOrder,
    getOrders,
    DescOrder,
    deleteOrder,
    sendOrder
  };