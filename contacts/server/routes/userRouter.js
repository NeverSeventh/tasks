const {Router} = require('express');
const EmptyFieldError = require('../Errors/EmptyFieldError');
const router = Router();
const bcrypt = require('bcrypt');
const createToken = require('../token/token');
const User = require('../models/User.model');
const SignUpError = require('../Errors/SignUpError');
const AuthError = require('../Errors/AuthError');
const LoginError = require('../Errors/LoginError');




router.get('/',async(req,res)=> {

    try {
        if (!req.userid) throw new AuthError;

        const {userid} = req;
        const user = await User.getUserById(userid);

        if (!user) throw new AuthError;

        return res.status(200).json({userid,name:user.name});
        
    } catch (e) {
        if (e instanceof AuthError) return res.status(401).json('Auth failed');
        res.status(500).json('Error');
    }

});


router.post('/login',async(req,res)=> {
    try {
        const {name,password} = req.body;

        if (!name || !password) throw new EmptyFieldError;
        
        const user = await User.getUserByName(name);

        if (!user) throw new LoginError('No user found');

        const compare = await bcrypt.compare(password,user.password);

        if (!compare) throw new LoginError('Wrong password');

        const token = createToken({userid:user.id},'secret',{ expiresIn: 86400})
        return res.status(200).json({name:user.name,userid:user.id,token});
        
        
    } catch (e) {
        if (e instanceof EmptyFieldError) return res.status(404).json('Every field must be filled');
        if (e instanceof LoginError) return res.status(401).json(e.message);
        res.status(500).json(e.message);
    }
})

router.post('/signup',async(req,res)=> {
    try {
        const {name,password} = req.body;
        

        if (!name || !password) throw new EmptyFieldError; 

        const hashedPassword =  await bcrypt.hash(password,10);
        const newUser = await User.insertNewUser(name,hashedPassword);

        if (!newUser) throw new SignUpError('cannot create user');

        const token =  createToken({userid:newUser.id},'secret',{ expiresIn: 86400});
        return res.status(200).json({userid:newUser.id,token});

        
    } catch (e) {
        console.log(e);
        if (e instanceof EmptyFieldError) return res.status(404).json('Every field must be filled');
        if (e instanceof SignUpError) return res.status(401).json(e.message);
        
        return res.status(500).json('error');
        
    }
    


})




module.exports= router;