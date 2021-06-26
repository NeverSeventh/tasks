const Team = require('./models/team.model')
const got = require('got');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');





(async () => {
	try {
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto('https://www.flashscore.ru/team/chelsea/4fGZN2oK/')
  
        // let c = await page.evaluate(()=> {
        //     let score = document.body.innerHTML;
        //     return score;
        // })
        
		const response = await got('https://www.flashscore.ru/team/bologna/0M9xNN8N/');
        
		const $ = cheerio.load(response.body)
            // const $ =  cheerio.load(c)
            
         
            
            const name = select('.teamHeader__name').text();
            
            const logoStyle = select('.teamHeader__logo').attr('style');
            
            const logoUrl = logoStyle.slice(logoStyle.indexOf('/'),-1);

            const country = select('.breadcrumb__link').eq(1).text();
        
            
            const res = await Team.insertTeam(name,country,logoUrl);
            console.log(res);
            // await browser.close();
        
 
       
        function select(selector,parent='body') {

            return $(parent).find(selector);
        }

	} catch (error) {
		console.log(error.message);
        
	}
})()


