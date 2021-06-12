const cheerio = require('cheerio');
const axios = require('axios');
const Statistic = require('../controllers/statistic');

exports.getData = async function (url, location) {
    let new_lcases;
    let new_ocases;
    let active_cases;
    let total_lcases;
    let total_ocases;
    let tests;
    let vaccinations;
    let deaths;
    let last_updated;

    // Grab the website
    const website = await axios.get(url);
    const $ = await cheerio.load(website.data);
    let overviewData = [];
    let vaccinationData = [];
    let sourceData = [];

    // Scrape the data
    $("#content > div > div:nth-child(1) > section > table > tbody > tr").each((index, element) => {
        if (index === 0) return true;
        let tds = $(element).find("td");

        let category = $(tds[0]).text();
        let total = $(tds[1]).text();
        let change = $(tds[3]).text();

        let tableRow = {category, total, change};
        overviewData.push(tableRow);
    });

    $("#content > div > div:nth-child(5) > section > table > tbody > tr").each((index, element) => {
        if (index === 0) return true;
        let tds = $(element).find("td");

        let total = $(tds[1]).text();
        let change = $(tds[3]).text();

        let tableRow = {total, change};
        vaccinationData.push(tableRow);
    });

    $("#content > div > div:nth-child(13) > section > table > tbody > tr").each((index, element) => {
        if (index === 0) return true;
        let tds = $(element).find("td");

        let total_local = $(tds[1]).text();
        let local = $(tds[3]).text();
        let total_overseas = $(tds[4]).text();
        let overseas = $(tds[6]).text();

        let tableRow = {total_local, local, total_overseas, overseas};
        sourceData.push(tableRow);
    });

    // Filter the data
    for (let i = 0; i < overviewData.length; i++) {
        switch(overviewData[i].category) {
            case "Cases":
                total_cases = overviewData[i].total;
                break;
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

    // Consolidate data into a usable object
    updateData = {
        location: location,
        new_lcases: (new_lcases === "-") ? 'N/A' : new_lcases,
        new_ocases: (new_ocases === "-") ? 'N/A' : new_ocases,
        active_cases: (active_cases === "-") ? 'N/A' : active_cases,
        total_lcases: (total_lcases === "-") ? 'N/A' : total_lcases,
        total_ocases: (total_ocases === "-") ? 'N/A' : total_ocases,
        tests: (tests === "-") ? 'N/A' : tests,
        vaccinations: (vaccinations === "-") ? 'N/A' : vaccinations,
        deaths: (deaths === "-") ? 'N/A' : deaths,
        last_updated: (last_updated === "-") ? 'N/A' : last_updated,
    }

    // Save to database
    await Statistic.update(location, updateData);

    return updateData;
}
