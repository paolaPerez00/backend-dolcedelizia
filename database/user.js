const mysql = require('mysql');
module.exports = () => {
  return mysql.createConnection({

    host : 'bteserlwmjxomvnjxrpl-mysql.services.clever-cloud.com',
    database : 'bteserlwmjxomvnjxrpl',
    user : 'uhmmtlmzsdbsbwjs',
    password : 'vP889yp9zEPCjVC2bJEo',
  });
};