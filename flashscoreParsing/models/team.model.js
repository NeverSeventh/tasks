const getDb = require('../db');

const db = getDb.getDb();

class Team {
  static async insertTeam(name, country, logo) {
    try {
      if (typeof country !== 'string' || typeof name !== 'string' || typeof logo !== 'string') throw new Error('Неправильный формат данных');

      const [id] = await db.query('select id from team where name=?', [name]);

      if (!id) {
        const response = await db.query('insert into team (name,country,logo) values (?,?,?)', [name, country, logo]);

        return response.insertId;
      }
      return 'Такая команда уже есть';
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = Team;
