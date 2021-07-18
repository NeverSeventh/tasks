const SignUpError = require('../Errors/SignUpError');
const db = require('./../db');


class User {
    
    static async insertNewUser(name,password) {
            
            const check = await User.getUserByName(name);
            if (check) throw new SignUpError('User with that name already exists')
            const res = await db.query('INSERT INTO users(name,password) values (?,?)',[name,password]);
            console.log(res);
            const newUser = await User.getUserById(res.insertId);
            
            return newUser;
        
    }

    static async getUserById(id) {
            const data = await db.query('SELECT * FROM users WHERE id=?',[id]);
            return data[0];
            
        
    }

    static async getUserByName(name) {
            const data = await db.query('SELECT * FROM users WHERE name=?',[name]);
            return data[0];
                  
}
}


module.exports = User;