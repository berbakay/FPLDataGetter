const axios = require('axios')
const fs = require('fs')

const WeekNumber = 1;

const testFunction = () => {
    fs.readFile(`./WeeklyStats/${WeekNumber}.html`, 'utf-8', (err, data) => {
        if (err) console.log(err);
        else 
        {
            let EditedRes = data.split(`var playersData	= JSON.parse('`)

            EditedRes = EditedRes[1].split("');")

            var newEditedres = EditedRes[0].replace(/\\x/g, "%");

            fs.writeFile(`../knex/data/2223data/${WeekNumber}.js`, `module.exports = ${decodeURIComponent(newEditedres)}`, err => {
                if (err)
                {
                    console.log( err )
                }     
            }) 
        }
    })
}

testFunction()