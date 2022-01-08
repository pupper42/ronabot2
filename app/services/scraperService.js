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
    let updateData;
    let overviewData = [];
    let vaccinationData = [];
    let sourceData = [];
    let vaxProgressData = [];

    let new_lcases;
    let new_ocases;
    let active_cases;
    let total_lcases;
    let total_ocases;
    let tests;
    let vaccinations;
    let deaths;
    let last_updated;
    let f_dose;
    let s_dose;

    let overviewSelector = "section.DAILY-SUMMARY > table > tbody > tr";
    let vaxSelector = "section.DAILY-VACCINATIONS > table > tbody > tr";
    let sourceSelector = "section.DAILY-SOURCE-OVERSEAS > table > tbody > tr";
    let vaccineProgress = "#page-state > div.wrapper > header > div > table > tbody > tr.STATS";

    // Grab the website
    const website = await axios.get(url);
    const $ = await cheerio.load(website.data);

    // Scrape the data
    $(vaccineProgress).each((index, element) => {
        if (index === 0) return true;
        let tds = $(element).find("td");

        let f_dose = $(tds[1]).text();
        let s_dose = $(tds[2]).text();

        let tableRow = {f_dose, s_dose};
        vaxProgressData.push(tableRow);
    })

    $(overviewSelector).each((index, element) => {
        if (index === 0) return true;
        let tds = $(element).find("td");

        let category = $(tds[0]).text();
        let total = $(tds[1]).text();
        let change = $(tds[3]).text();

        let tableRow = {category, total, change};
        overviewData.push(tableRow);
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
    for (let i = 0; i < overviewData.length; i++) {
        switch (overviewData[i].category) {
            case "Active":
                active_cases = overviewData[i].total;
                break;
            case "Last Updated":
                last_updated = overviewData[i].total;
                break;
            case "Deaths":
                deaths = overviewData[i].total;
                break;
            case "Tests":
                tests = overviewData[i].change;
                break;
            case "Cases":
                new_lcases = overviewData[i].change;
        }

    }

    // Consolidate data into a usable object and check if data is valid
    updateData = {
        location: _.isEmpty(location) ? '-' : location,
        new_lcases: _.isEmpty(new_lcases) ? '-' : new_lcases,
        new_ocases: _.isEmpty(sourceData[0].overseas) ? '-' : sourceData[0].overseas,
        active_cases: _.isEmpty(active_cases) ? '-' : active_cases,
        total_lcases: _.isEmpty(sourceData[0].total_local) ? '-' : sourceData[0].total_local,
        total_ocases: _.isEmpty(sourceData[0].total_overseas) ? '-' : sourceData[0].total_overseas,
        tests: _.isEmpty(tests) ? '-' : tests,
        vaccinations: _.isEmpty(vaccinationData[0].change) ? '-' : vaccinationData[0].change,
        deaths: _.isEmpty(deaths) ? '-' : deaths,
        last_updated: _.isEmpty(sourceData[0].day) ? '-' : sourceData[0].day,
        f_dose: _.isEmpty(vaxProgressData[0].f_dose) ? '-' : vaxProgressData[0].f_dose,
        s_dose: _.isEmpty(vaxProgressData[0].s_dose) ? '-' : vaxProgressData[0].s_dose
    }

    // Save to database
    // console.log(updateData);
    await Statistic.update(location, updateData);

    return updateData;
}
