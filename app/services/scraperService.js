/**
 * Scraper Service
 *
 * Used to retrieve data from the COVID live website
 */

const cheerio = require('cheerio');
const axios = require('axios');
const Statistic = require('../controllers/statistic');
const _ = require('lodash');

/**
 * Scrapes the COVID live website for data
 *
 * @param url
 * @param location
 * @returns {Promise<{new_lcases, last_updated, tests, vaccinations, new_ocases: (*|jQuery), total_ocases: (*|jQuery), location, total_lcases: (*|jQuery), active_cases, deaths}>}
 */
exports.getData = async function (url, location) {

    // Grab the website
    const website = await axios.get(url);
    const $ = await cheerio.load(website.data);
 
        let updateData;

        // <STATE> DAILY SUMMARY
        let dailySummaryTable = "section.DAILY-SUMMARY > table > tbody > tr";
        let dailySummaryTableData = [];

        let active_cases;
        let deaths;
        let tests;
        let new_cases;
        let total_cases;

        $(dailySummaryTable).each((index, element) => {
            let tds = $(element).find("td");

            let category = $(tds[0]).text();
            let total = $(tds[1]).text();
            let change = $(tds[3]).text();

            let tableRow = {category, total, change};
            dailySummaryTableData.push(tableRow);
        });

        for (let i = 0; i < dailySummaryTableData.length; i++) {
            switch (dailySummaryTableData[i].category) {
                case "Active":
                    active_cases = dailySummaryTableData[i].total;
                    break;
                case "Last Updated":
                    last_updated = dailySummaryTableData[i].total;
                    break;
                case "Deaths":
                    deaths = dailySummaryTableData[i].total;
                    break;
                case "Tests":
                    tests = dailySummaryTableData[i].change;
                    break;
                case "Cases":
                    new_cases = dailySummaryTableData[i].change;
                    total_cases = dailySummaryTableData[i].total;
                    break;
            }
        }


        // TOP BAR DATA (where the logo is and stuff)
        let topBar = "#page-state > div.wrapper > header > div > table > tbody > tr.STATS"
        let topBarData = [];

        $(topBar).each((index, element) => {
            let tds = $(element).find("td");
            let t_dose = $(tds[1]).text();
            let case_av = $(tds[2]).text();
            let tableRow = {t_dose, case_av};
            topBarData.push(tableRow);
        });

        // <STATE> FIRST DOSES
        let firstDoseTable = "section.DAILY-VACCINATIONS-FIRST-DOSES > table > tbody > tr"
        let firstDoseTableData = [];

        $(firstDoseTable).each((index, element) => {
            let tds = $(element).find("td");

            let total = $(tds[1]).text();
            let f_dose = $(tds[2]).text();

            let tableRow = {total, f_dose};
            firstDoseTableData.push(tableRow);
        });

        // <STATE> SECOND DOSES
        let secondDoseTable = "section.DAILY-VACCINATIONS-PEOPLE > table > tbody > tr" 
        let secondDoseTableData = [];
        
        $(secondDoseTable).each((index, element) => {
            let tds = $(element).find("td");

            let total = $(tds[1]).text();
            let s_dose = $(tds[2]).text();

            let tableRow = {total, s_dose};
            secondDoseTableData.push(tableRow);
        });


        // Consolidate data into a usable object and check if data is valid
        updateData = {
            location: _.isEmpty(location) ? '-' : location,
            new_cases: _.isEmpty(new_cases) ? '-' : new_cases,
            case_av: _.isEmpty(topBarData[0]) ? '-' : topBarData[0].case_av,
            total_cases: _.isEmpty(total_cases) ? '-' : total_cases,
            active_cases: _.isEmpty(active_cases) ? '-' : active_cases,
            tests: _.isEmpty(tests) ? '-' : tests,
            deaths: _.isEmpty(deaths) ? '-' : deaths,
            f_dose: _.isEmpty(firstDoseTableData[1]) ? '-' : firstDoseTableData[1].f_dose,
            s_dose: _.isEmpty(secondDoseTableData[1]) ? '-' : secondDoseTableData[1].s_dose,
            t_dose: _.isEmpty(topBarData[0]) ? '-' : topBarData[0].t_dose
        }

    // Save to database
    // console.log(updateData);
    await Statistic.update(location, updateData);

    return updateData;
}
