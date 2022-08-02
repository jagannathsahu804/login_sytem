const mysql = require('mysql2');
require("dotenv").config();

const dbconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DBPORT
});

module.exports = dbconnection;