const db = require('./../db');





class Contact {
    static async getAllContacts(userid) {
        const contacts = db.query('select contacts.name,contacts.number,contacts.id,contacts.org,contacts.email from contacts join users on contacts.userid=users.id where users.id =?',[userid])
    }


    static async getContactById(id) {

    }

    static async addNewContact(userid,number,name=null,org=null,email=null) {
        if (!userid) throw new Error('no user');
        
    }
}


module.exports = Contact;