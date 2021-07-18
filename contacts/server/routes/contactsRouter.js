const {Router} = require('express');
const AuthError = require('../Errors/AuthError');
const EmptyFieldError = require('../Errors/EmptyFieldError');
const Contact = require('../models/Contact.model');
const router = Router();



router.get('/',async(req,res)=> {

    try {
        if (!req.userid) throw new AuthError;
        const {userid} =req;
        const contacts = await Contact.getAllContacts(userid);
        return res.status(200).json(contacts);
        
    } catch (e) {
        if (e instanceof AuthError) return res.status(401).json('No auth');
        return res.status(500).json('error'); 
    }

}) 

router.post('/add',async(req,res)=> {
    try {
        if (!req.userid) throw new AuthError;
        const{userid}=req;
        const {number,name,email,org} = req.body;
        if (!number) throw new EmptyFieldError('Number is required');
        const newContact =await Contact.addNewContact({userid,name,org,email,number});
        if (!newContact) throw new Error;
        return res.status(200).json(newContact);
        
    } catch (e) {
        if (e instanceof AuthError) return res.status(401).json('No auth');
        if (e instanceof EmptyFieldError) return res.status(401).json(e.message);
        return res.status(500).json(e.message); 

    }
});

router.patch('/edit',async(req,res)=> {
    try {
        if (!req.userid) throw new AuthError;
        const {userid} = req;
        const {number,name,email,org,contactid} = req.body;
        const responce = await Contact.editContact(userid,contactid,{number,name,email,org});
        return res.status(200).json(responce);
    } catch (e) {
        if (e instanceof AuthError) return res.status(401).json('No auth');
        res.status(500).json(e.message);
    }
})

router.delete('/:id',async(req,res)=> {
    try {
        
        if (!req.userid) throw new AuthError;
        const {id} = req.params;
        const {userid} = req;
        await Contact.deleteContact(id,userid);
        
        return res.status(200).json('deleted');
    } catch (e) {
        if (e instanceof AuthError) return res.status(401).json('No auth');
        res.status(500).json(e.message);
    }
})

module.exports = router;