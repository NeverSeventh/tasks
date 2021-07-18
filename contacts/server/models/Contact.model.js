const AuthError = require('../Errors/AuthError');
const db = require('./../db');





class Contact {
    static async getAllContacts(userid) {
        const contacts = await db.query('select contacts.name,contacts.number,contacts.id,contacts.org,contacts.email from contacts join users on contacts.userid=users.id where users.id =?',[userid])
        return contacts;
    }


    static async getContactById(id) {
        const contact = await db.query('select * from contacts where id=?',[id]);
        return contact[0];
    }

    static async addNewContact({userid,number,name=null,org=null,email=null}) {
        if (!userid) throw new AuthError('no user');
        const res = await db.query("insert into contacts (userid,number,name,email,org) values(?,?,?,?,?)",[userid,number,name,email,org]);
        const contact = await Contact.getContactById(res.insertId);
        return contact;
    }

    static async editContact(userid,contactid,args) {
        if (!userid) throw new AuthError('no user');
        const filtered = [];
        const returned = {};
        let str = '';
        for (let key in args) {
            if (args[key]!==undefined) {
                filtered.push(args[key]);
                str+=`${key}=?, `;
                returned[key]=args[key];
            }
            
             
        }
        if (str.length===0) return null;

        str=str.slice(0,-2);
        const res = await db.query(`UPDATE contacts SET ${str} WHERE userid=? and id=?`,[...filtered,userid,contactid])
        return returned;
    }

    static async deleteContact(id,userid) {
        const res = await db.query('DELETE FROM contacts where id=? and userid=?',[id,userid])
        return;
    }
}


module.exports = Contact;