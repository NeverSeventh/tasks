const express = require('express');
const app = express();
const logger = require('morgan');
const Team = require('./models/team.model')
const got = require('got');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')




app.use(logger('dev'));



(async () => {
	try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.flashscore.ru/team/chelsea/4fGZN2oK/')
  
        let c = await page.evaluate(()=> {
            let score = document.body.innerHTML;
            return score;
        })
        
		//const response = await got('https://www.flashscore.ru/team/chelsea/4fGZN2oK/');
        
		// const $ = cheerio.load(response.body)
            const $ =  cheerio.load(c)
        
            const name = $('body').find('.teamHeader__name').text();
            const logoStyle = $('body').find('.teamHeader__logo').attr('style');
            
            const logoUrl = logoStyle.slice(logoStyle.indexOf('/'),-1);
            const countryEl = $('body').find('.breadcrumb__link');
            //const country = countryEl.toArray()[1].children[0].data;
            const country =  countryEl.eq(1).text();
            //const res = await Team.insertTeam(name,country,logoUrl);
            await browser.close();
        
 
       


	} catch (error) {
		console.log(error.message);
        
	}
})()


app.listen(6000,()=> {
    console.log('server started');
})