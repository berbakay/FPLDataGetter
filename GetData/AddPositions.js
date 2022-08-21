const { gameWeek } = require('../globalVariables')
const positions = require('../knex/data/positions.json')
const playerList = require(`../knex/data/${gameWeek}.json`)
const fs = require('fs')

function addPostions(playerList, positionList) {
    let playerListCopy = [...playerList]
    let missingPlayers = []
    playerListCopy.forEach( player => {
        positionList.forEach( position => { 
            if (position.name == player.second_name &&
                position.team == player.team_title )
            {
                player.position = position.position
            }
            else if( position.name == player.player_name &&
                position.team == player.team_title )
            {
                //console.log('here', player.player_name, position.name)
                player.position = position.position
            }
        })
    })

    playerListCopy.forEach( newPlayer => {
        if( !('position' in newPlayer) )
        {
            //console.log(`${newPlayer.player_name} does not have a position`)
            missingPlayers.push({'name': newPlayer.player_name, 'team': newPlayer.team_title})
        }
    })

    console.log('players missing positions:',missingPlayers.length)

    fs.writeFile(`../knex/data/${gameWeek}.json`, JSON.stringify(playerListCopy), err => {
        if (err)
        {
            console.log( err )
        }
        else
        {
            fs.writeFile(`../knex/data/notFound/noPosition${gameWeek}.json`, JSON.stringify(missingPlayers), err => {
                if (err)
                {
                    console.log( err )
                }  
            })
        }
    })
}

addPostions( playerList, positions)