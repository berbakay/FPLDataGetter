const { gameWeek } = require('../globalVariables')
const newWeek = require(`../knex/data/${gameWeek}.json`)
const lastWeek = require(`../GetData/old/old${gameWeek - 1}.json`)
const fs = require('fs')

function subtractor( newWeek, lastWeek ) {

    const keysToChange = ['games', 'time', 'goals', 'xG', 'assists', 'xA', 'shots', 'key_passes', 'yellow_cards', 'red_cards', 'npg', 'npxG', 'xGChain', 'xGBuildup']
    fs.writeFile(`../GetData/old/old${gameWeek}.json`, JSON.stringify(newWeek), err => {
        if (err)
        {
            console.log( err )
        }
        else
        {
            const updatedNewWeek = [...newWeek ]
            updatedNewWeek.forEach( newPlayer => {
                lastWeek.forEach( playerLastWeek => {
                    if(playerLastWeek.id == newPlayer.id )
                    {
                        //console.log('here')
                        keysToChange.forEach(key => {
                            newPlayer[key] = newPlayer[key] - playerLastWeek[key]
                        })
                    }
                })
            }) 
            fs.writeFile(`../knex/data/${gameWeek}.json`, JSON.stringify(updatedNewWeek), err => {
                if (err)
                {
                    console.log( err )
                }
            })
        } 
    })
}

subtractor( newWeek, lastWeek )