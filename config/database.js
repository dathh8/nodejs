const mysql = require('mysql2');

const connect = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'Huudat.2309',
    database: 'uat130323'
});

// connect.connect(function(error) {
//     if (error) throw error;
//     console.log("Mysql Connected");
// });

module.exports = connect.promise();