const cheerio = require('cheerio');
const axios = require('axios');
const Statistic = require('../models/statistic');


exports.getData = async function (url) {
    var new_cases;
    var case_change;
    var active_cases;
    var total_cases;
    var update;
    var last_updated;
    var tests;
    var local_cases;
    var overseas_cases;
    
    var { website } = await axios.get(url);
    var $ = cheerio.load(website);
    var data = [];

    $("#content > div > div:nth-child(1) > section > table > tbody > tr").each((index, element) => { 
        if (index === 0) return true;
        var tds = $(element).find("td");

        var category = $(tds[0]).text();
        var total = $(tds[1]).text();
        var change = $(tds[3]).text();

        var tableRow = {category, total, change};
        data.push(tableRow);       

    });
    
    for (i = 0; i < data.length; i++) {
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

}