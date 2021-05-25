const cheerio = require('cheerio');
const axios = require('axios');
const Statistic = require('../controllers/statistic');

exports.getData = async function (url) {
    let new_cases;
    let case_change;
    let active_cases;
    let total_cases;
    let update;
    let last_updated;
    let tests;
    let local_cases;
    let overseas_cases;

    // Grab the website
    const { website } = await axios.get(url);
    const $ = cheerio.load(website);
    let data = [];

    // Scrape the data
    $("#content > div > div:nth-child(1) > section > table > tbody > tr").each((index, element) => {
        if (index === 0) return true;
        let tds = $(element).find("td");

        let category = $(tds[0]).text();
        let total = $(tds[1]).text();
        let change = $(tds[3]).text();

        let tableRow = {category, total, change};
        data.push(tableRow);
    });

    // Filter the data
    for (let i = 0; i < data.length; i++) {
        switch(data[i].category) {
            case "New Cases":
                new_cases = data[i].total;
                break;
            case "Cases":
                case_change = data[i].change;
                total_cases = data[i].total;
                break;
            case "Active":
                active_cases = data[i].total;
                break;
            case "Last Updated":
                last_updated = data[i].total;
                break;
            case "Deaths":
                deaths = data[i].change;
                break;
            case "Tests":
                tests = data[i].change;
                break;

        }
    }

    // Save to database
    // Something like Statistic.create() or Statistic.update()

}
