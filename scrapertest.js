/**
 * Scraper Service
 *
 * Used to retrieve data from the COVID live website
 */

 const cheerio = require('cheerio');
 const axios = require('axios');

 const _ = require('lodash');
 
 /**
  * Scrapes the COVID live website for data
  *
  * @param url
  * @param location
  * @returns {Promise<{new_lcases, last_updated, tests, vaccinations, new_ocases: (*|jQuery), total_ocases: (*|jQuery), location, total_lcases: (*|jQuery), active_cases, deaths}>}
  */
getData = async function (url, location) {
     let updateData;
     let dailySummaryData = [];
     let vaccinationData = [];
     let sourceData = [];
     let vaxProgressData = [];
 
     let new_lcases;
     let active_cases;
     let tests;
     let deaths;
     let last_updated;
 
     let dailySummarySelector = "section.DAILY-SUMMARY > table > tbody > tr";
     let vaxSelector = "section.DAILY-VACCINATIONS > table > tbody > tr";
     let sourceSelector = "section.DAILY-SOURCE-OVERSEAS > table > tbody > tr";
     let vaccineProgressSelector = "#page-state > div.wrapper > header > div > table > tbody > tr.STATS"

   
 
     // Grab the website
     const website = await axios.get(url);
     const $ = await cheerio.load(website.data);

     console.log($(vaccineProgressSelector).text());
 
     // Scrape the data
 

     $(vaccineProgressSelector).each((index, element) => {
         let tds = $(element).find("td");
         let f_dose = $(tds[1]).text();
         let s_dose = $(tds[2]).text();
         let tableRow = {f_dose, s_dose};
         vaxProgressData.push(tableRow);
     });

     console.log(vaxProgressData)
 
 
     $(dailySummarySelector).each((index, element) => {
         if (index === 0) return true;
         let tds = $(element).find("td");
 
         let category = $(tds[0]).text();
         let total = $(tds[1]).text();
         let change = $(tds[3]).text();
 
         let tableRow = {category, total, change};
         dailySummaryData.push(tableRow);
     });
 
     $(vaxSelector).each((index, element) => {
         if (index === 0) return true;
         let tds = $(element).find("td");
 
         let total = $(tds[1]).text();
         let change = $(tds[3]).text();
 
         let tableRow = {total, change};
         vaccinationData.push(tableRow);
     });
 
     $(sourceSelector).each((index, element) => {
         if (index === 0) return true;
         let tds = $(element).find("td");
 
         let day = $(tds[0]).text();
         let total_overseas = $(tds[1]).text();
         let overseas = $(tds[3]).text();
         let total_local = $(tds[4]).text();
         let local = $(tds[6]).text();
 
         let tableRow = {total_local, local, total_overseas, overseas, day};
         sourceData.push(tableRow);
     });
 
 
     // Filter the data
     for (let i = 0; i < dailySummaryData.length; i++) {
         switch (dailySummaryData[i].category) {
             case "Active":
                 active_cases = dailySummaryData[i].total;
                 break;
             case "Last Updated":
                 last_updated = dailySummaryData[i].total;
                 break;
             case "Deaths":
                 deaths = dailySummaryData[i].total;
                 break;
             case "Tests":
                 tests = dailySummaryData[i].change;
                 break;
             case "Cases":
                 new_lcases = dailySummaryData[i].change;
         }
 
     }
 
     // Consolidate data into a usable object and check if data is valid
     updateData = {
         location: _.isEmpty(location) ? '-' : location,
         new_lcases: _.isEmpty(new_lcases) ? '-' : new_lcases,
         new_ocases: _.isEmpty(sourceData[0]) ? '-' : sourceData[0].overseas,
         active_cases: _.isEmpty(active_cases) ? '-' : active_cases,
         total_lcases: _.isEmpty(sourceData[0]) ? '-' : sourceData[0].total_local,
         total_ocases: _.isEmpty(sourceData[0]) ? '-' : sourceData[0].total_overseas,
         tests: _.isEmpty(tests) ? '-' : tests,
         vaccinations: _.isEmpty(vaccinationData[0]) ? '-' : vaccinationData[0].change,
         deaths: _.isEmpty(deaths) ? '-' : deaths,
         last_updated: _.isEmpty(sourceData[0]) ? '-' : sourceData[0].day,
         f_dose: _.isEmpty(vaxProgressData[0]) ? '-' : vaxProgressData[0].f_dose,
         s_dose: _.isEmpty(vaxProgressData[0]) ? '-' : vaxProgressData[0].s_dose
     }
 
     // Save to database
      console.log(updateData);
   
 
     return updateData;
 } 

 getData("https://covidlive.com.au/vic", "vic")