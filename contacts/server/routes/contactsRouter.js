const {Router} = require('express');
const AuthError = require('../Errors/AuthError');
const router = Router();



router.get('/',(req,res)=> {

    try {
        if (!req.userid) throw new AuthError;
        
        
    } catch (e) {
        
    }

}) 




module.exports = router;