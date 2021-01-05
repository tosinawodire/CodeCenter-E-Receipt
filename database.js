const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tcc',
    multipleStatements: true
});


conn.connect((err) => {
    if(!err){
        console.log('Connection to the database established succesfully')
    }
    else{
        console.log('connnection failed'+ JSON.stringify(err, undefined,2));
    }
})
module.exports = conn;