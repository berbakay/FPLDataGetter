const axios = require('axios')
const fs = require('fs');
const { type } = require('os');
const { gameWeek } = require('../globalVariables');

const WeekNumber = gameWeek;

const testFunction = () => {
    fs.readFile(`./UnderstatWeeklyHTML/${WeekNumber}.html`, 'utf-8', (err, data) => {
        if (err) console.log(err);
        else 
        {
            let EditedRes = data.split(`var playersData	= JSON.parse('`)

            EditedRes = EditedRes[1].split("');")

            let newEditedres = EditedRes[0].replace(/\\x/g, "%");

            let newNewEditedres = decodeURIComponent(newEditedres).replace(/&#039;/g,`'`).replace(/\\u00e9/g, 'é')

            fs.writeFile(`../knex/data/${WeekNumber}.json`, newNewEditedres, 'utf8', err => {
                if (err)
                {
                    console.log( err )
                }                    
            }) 
        }
    })
}

testFunction()