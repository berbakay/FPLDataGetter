const axios = require('axios')
const fs = require('fs')
const { gameWeek } = require('../globalVariables');

const WeekNumber = gameWeek;

const testFunction = () => {
    fs.readFile(`./UnderstatWeeklyHTML/${WeekNumber}.html`, 'utf-8', (err, data) => {
        if (err) console.log(err);
        else 
        {
            let EditedRes = data.split(`var playersData	= JSON.parse('`)

            EditedRes = EditedRes[1].split("');")

            var newEditedres = EditedRes[0].replace(/\\x/g, "%");

            fs.writeFile(`../knex/data/${WeekNumber}.json`, decodeURIComponent(newEditedres), err => {
                if (err)
                {
                    console.log( err )
                }     
            }) 
        }
    })
}

testFunction()