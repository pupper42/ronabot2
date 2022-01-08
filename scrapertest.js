/**
 * Scraper Service
 *
 * Used to retrieve data from the COVID live website
 */

const cheerio = require('cheerio');
const axios = require('axios');

/**
 * Scrapes the COVID live website for data
 *
 * @param url
 * @param location
 * @returns {Promise<{new_lcases, last_updated, tests, vaccinations, new_ocases: (*|jQuery), total_ocases: (*|jQuery), location, total_lcases: (*|jQuery), active_cases, deaths}>}
 */
async function getData(url, location) {
    let updateData;
    let dailySummaryData = [];
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

    let dailySummarySelector = "section.DAILY-SUMMARY > table > tbody > tr";
    let vaxSelector = "section.DAILY-VACCINATIONS > table > tbody > tr";
    let sourceSelector = "section.DAILY-SOURCE-OVERSEAS > table > tbody > tr";
    //let vaccineProgressSelector = "#page-state > div.wrapper > header > div > table > tbody > tr.STATS"

    // Grab the website
    const website = await axios.get(url);
    const $ = await cheerio.load(website.data);

    // Scrape the data

    /* Not working for some reason lol
    $(vaccineProgressSelector).each((index, element) => {
        if (index === 0) return true;
        let tds = $(element).find("td");
        let f_dose = $(tds[1]).text();
        let s_dose = $(tds[2]).text();
        let tableRow = {f_dose, s_dose};
        vaxProgressData.push(tableRow);
    });
    */


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

    new_ocases = sourceData[0].overseas;
    total_lcases = sourceData[0].total_local;
    total_ocases = sourceData[0].total_overseas;
    vaccinations = vaccinationData[0].change;
    last_updated = sourceData[0].day;
    //f_dose = vaxProgressData[0].f_dose;
    //s_dose = vaxProgressData[0].s_dose;

    
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
        f_dose: f_dose,
        s_dose: s_dose
    }

    // Loop through updateData to check for empty data (because Discord doesn't like empty data zz)
    for (let data in updateData) {
        if (updateData[data] === '' || updateData[data] === '-') {
            updateData[data] = '-';
        }
    }

    // Save to database
    console.log(updateData);

    return updateData;
}

getData("https://covidlive.com.au/vic", "vic");