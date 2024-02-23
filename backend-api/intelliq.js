var mysql=require('mysql');
 
var  con = mysql.createPool({
        multipleStatements: true,
        host: "127.0.0.1",
        user:"root",
        database: "intelliq"
    });

module.exports = con;