/**
 * Scraper Service
 *
 * Used to retrieve data from the COVID live website
 */

const cheerio = require('cheerio');
const axios = require('axios');
const Statistic = require('../controllers/statistic');

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
    let new_lcases;
    let new_ocases;
    let active_cases;
    let total_lcases;
    let total_ocases;
    let tests;
    let vaccinations;
    let deaths;
    let last_updated;

    let overviewSelector = "section.DAILY-SUMMARY > table > tbody > tr";
    let vaxSelector = "section.DAILY-VACCINATIONS > table > tbody > tr";
    let sourceSelector = "section.DAILY-SOURCE-OVERSEAS > table > tbody > tr";

    // Grab the website
    const website = await axios.get(url);
    const $ = await cheerio.load(website.data);

    // Scrape the data
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
        let total_local = $(tds[1]).text();
        let local = $(tds[3]).text();
        let total_overseas = $(tds[4]).text();
        let overseas = $(tds[6]).text();

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
        }

    }

    new_lcases = sourceData[0].local;
    new_ocases = sourceData[0].overseas;
    total_lcases = sourceData[0].total_local;
    total_ocases = sourceData[0].total_overseas;
    vaccinations = vaccinationData[0].change;
    last_updated = sourceData[0].day;

    // Consolidate data into a usable object
    updateData = {
        location: location,
        new_lcases: new_lcases,
        new_ocases: new_ocases,
        active_cases: active_cases,
        total_lcases: total_lcases,
        total_ocases: total_ocases,
        tests: tests,
        vaccinations: vaccinations,
        deaths: deaths,
        last_updated: last_updated,
    }

    // Loop through updateData to check for empty data (because Discord doesnt like empty data zz)
    for (let data in updateData) {
        if (updateData[data] === '' || updateData[data] === '-') {
            updateData[data] = 'N/A';
        }
    }

    // Save to database
    console.log(updateData);
    await Statistic.update(location, updateData);

    return updateData;
}
