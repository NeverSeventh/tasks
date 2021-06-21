const getDb = require('./../db');
const db = getDb.getDb();

class Team {
    static async insertTeam(name,country,logo) {
        try {
            const response = await db.query('insert into team (name,country,logo) values (?,?,?)',[name,country,logo]);

            return response.insertId;
            
        } catch (e) {
            if (e.errno === 1062) {
                return 'Такая команда уже существует'
            }
            
        }
    }
}

module.exports = Team;