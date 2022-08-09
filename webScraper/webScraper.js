const axios = require('axios')
const fs = require('fs')

const testFunction = () => {
    axios.get( `https://understat.com/league/EPL/2021`)
    .then(res => {

        var EditedRes = res.data.split(`var playersData	= JSON.parse('`)

        EditedRes = EditedRes[1].split("');")

        var newEditedres = EditedRes[0].replace(/\\x/g, "%");

        fs.writeFile(`test2.json`, decodeURIComponent(newEditedres), err => {
            if (err)
            {
                console.log( err )
            }  
        })   
    })
}

testFunction()