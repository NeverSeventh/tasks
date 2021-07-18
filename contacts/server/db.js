const mysql = require('mysql2');

const config = {     
    connectionLimit:5,
    host:'localhost',
    user:'root',
    password:'root',
    database:'contacts',
    
}


class Database {
    constructor(config) {
        try {
            this.connection = mysql.createPool(config);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    query(sql,args) {
        return new Promise((resolve,reject)=>{
            this.connection.execute(sql,args,(err,data)=>{
                
                if (err) return reject(err)
                
                resolve(data);
            });
        });
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}


module.exports= new Database(config);