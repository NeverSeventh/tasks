const got = require('got');
const cheerio = require('cheerio');
const Team = require('./models/team.model');

(async () => {
  try {
    const response = await got('https://www.flashscore.ru/team/bologna/0M9xNN8N/');
    const $ = cheerio.load(response.body);

    function select(selector, parent = 'body') {
      return $(parent).find(selector);
    }

    const name = select('.teamHeader__name').text().trim();
    const logoStyle = select('.teamHeader__logo').attr('style');
    const logoUrl = logoStyle.slice(logoStyle.indexOf('/'), -1);
    const country = select('.breadcrumb__link').eq(1).text();

    const res = await Team.insertTeam(name, country, logoUrl);
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
})();
