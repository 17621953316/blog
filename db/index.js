const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    database:'mysql_001',
    user:'root',
    password:'root'
})

module.exports = conn