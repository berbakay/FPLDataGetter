const missingPositionPlayers = require('../knex/data/notFound/noPosition1.json')
const positionPlayers = require('./positions.json')
const fs = require('fs')

function loopAllPlayerTeams ( missingPositionPlayers ) {
    let missingTeams = []
    missingPositionPlayers.forEach( player => {
        let exists = false

        missingTeams.forEach( team => {
            console.log(team.team, player.team)
            if(team.team == player.team )
            {
                exists = true
            }
        })

        if( !exists )
        {
            missingTeams.push({'team':player.team, 'count': 1 });
        }
        else 
        {
            missingTeams.forEach( team => {
                if(team.team == player.team )
                {
                    team.count = team.count +1;
                }
            })
        }
    })

    console.log( missingTeams )
}

let missingTeamArray = 
[{ 'positionTeam': "Man City",      'fplTeam': 'Manchester City'},
 { 'positionTeam': "Newcastle",     'fplTeam': 'Newcastle United'},
 { 'positionTeam': "Spurs",         'fplTeam': 'Tottenham'},
 { 'positionTeam': "Man Utd",       'fplTeam': 'Manchester United'},
 { 'positionTeam': "Nott'm Forest", 'fplTeam': 'Nottingham Forest'},
 { 'positionTeam': "Wolves",        'fplTeam': 'Wolverhampton Wanderers'}]

function loopAllPositionPlayers(missingTeamArray, positionPlayers) {
    let newPositionPlayers = [...positionPlayers]
    newPositionPlayers.forEach( player => {
        missingTeamArray.forEach( team => {
            if (player.team == team.positionTeam )
            {
                player.team = team.fplTeam;
            }
        })
    })

    fs.writeFile(`../Tests/positions.json`, JSON.stringify(newPositionPlayers), err => {
        if (err)
        {
            console.log( err )
        }  
    })
}
loopAllPlayerTeams( missingPositionPlayers)
//loopAllPositionPlayers( missingTeamArray, positionPlayers )