const mysql = require('mysql');

const db = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : 'root',
    database : 'sampledb'
});

db.connect((err)=>{
    if(err){
        return console.log(err);
    }

    console.log("Database Connected!");
});

module.exports = db;