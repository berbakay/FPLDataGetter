const axios = require('axios')
const { fstat } = require('fs')
const {Pool, Client} = require('pg')
const { gameWeek } = require('../globalVariables')
const jsonPlayers = require(`../knex/data/${gameWeek}.json`)
const fs = require('fs')
const { resourceLimits } = require('worker_threads')
const { playerNameObj } = require('./lonelyPlayerName')
const { teamArray } = require('../knex/data/opponentTeam')

const pool = new Pool({
    username: "rick",
    host: 'localhost',
    password: "A55holeAnymore",
    database: 'fpl_data',
    port: '5432'
})

const GameWeek = gameWeek;

function playerNameSorter( playerName ) {

    let newName = playerName;

    Object.keys(playerNameObj).forEach( CorrectPlayerNameKey => {
        if( playerName == CorrectPlayerNameKey )
        {
            newName = playerNameObj[CorrectPlayerNameKey];
        }
    })

    return newName;
}

async function GetFplData( playerDataObj ) {

    const newPlayerDatatObjArray = [...playerDataObj];
    let players = []
    let promises = []
    let notFoundPlayers = []
    let passTwoNotFound = []

    axios.get( 'https://fantasy.premierleague.com/api/bootstrap-static/')
    .then( res => {
        const playersList = res.data.elements
        const filteredplaylists = [];

        playersList.forEach(player => {
            const playerObj = {};
            let first_name =  player.first_name;
            let second_name = player.second_name;
            let fullName = `${first_name} ${second_name}`
            let id = player.id;

            playerObj.first_name = first_name;
            playerObj.second_name = second_name;
            playerObj.fullName = fullName;
            playerObj.id = id;



            filteredplaylists.push( playerObj )

        });

        return filteredplaylists;
    })
    .then( filteredPlayerList => {
        filteredPlayerList.forEach( player => {
            promises.push(
                axios.get( `https://fantasy.premierleague.com/api/element-summary/${player.id}/`)
                    .then( res => {
                        playerDataHistory = res.data.history
                        for ( j = 0; j < playerDataHistory.length; j++ )
                        {
                            if( playerDataHistory[j].round == GameWeek )
                            {
                                const fplDataPlayerObj = {}

                                fplDataPlayerObj.opponent_team_int = playerDataHistory[j].opponent_team;
                                fplDataPlayerObj.opponent_team_str = teamArray[fplDataPlayerObj.opponent_team_int]
                                fplDataPlayerObj.total_points = playerDataHistory[j].total_points;
                                fplDataPlayerObj.was_home = playerDataHistory[j].was_home;
                                fplDataPlayerObj.goals_conceded = playerDataHistory[j].goals_conceded;
                                fplDataPlayerObj.saves = playerDataHistory[j].saves;
                                fplDataPlayerObj.bonus = playerDataHistory[j].bonus;
                                fplDataPlayerObj.bps = playerDataHistory[j].bps
                                fplDataPlayerObj.clean_sheets = playerDataHistory[j].clean_sheets;
                                fplDataPlayerObj.value = playerDataHistory[j].value;
                                fplDataPlayerObj.selected = playerDataHistory[j].selected;
                                fplDataPlayerObj.transfers_balance = playerDataHistory[j].transfers_balance;
                                fplDataPlayerObj.player_name = playerNameSorter(player.fullName);
                                fplDataPlayerObj.id = player.id;
                                fplDataPlayerObj.second_name = player.second_name;

                                players.push(fplDataPlayerObj);
                            }
                        }
                })
            )           
        })
     })
    .then(() => 
        Promise.all(promises).then( () => {
            //console.log( players )
            players.forEach(fplPlayer => {
                let foundPlayer = false;
                newPlayerDatatObjArray.forEach( understatPlayer => {

                    if(understatPlayer.player_name == 'Emerson' && understatPlayer.team_title == "West Ham" )
                    {
                        understatPlayer.player_name = 'Emersonn'
                    }

                    delete understatPlayer.position

                    let passTwoFound = false;
                    if( understatPlayer.player_name == fplPlayer.player_name )
                    {                    
                        foundPlayer = true;
                        for( const key of Object.keys(fplPlayer ) )
                        {
                            understatPlayer[key] = fplPlayer[key];

                        }
                    }

                    players.forEach( secondPass => {
                        if( secondPass.player_name == understatPlayer.player_name )
                        {
                            passTwoFound = true;
                        }

                    })

                    if( !passTwoFound )
                    {
                        if( !passTwoNotFound.includes( understatPlayer.player_name ) )
                        {
                            passTwoNotFound.push( understatPlayer.player_name)
                        }   
                    }
                })

                if( !foundPlayer )
                {
                    notFoundPlayers.push( fplPlayer.player_name );
                }
            })
            
            fs.writeFile(`../knex/data/${GameWeek}.json`, JSON.stringify(newPlayerDatatObjArray), err => {
                if (err)
                {
                    console.log( err )
                }  
                else
                {
                    fs.writeFile(`../knex/data/notFound/lonelyFplPlayers${GameWeek}.json`, JSON.stringify(notFoundPlayers), err => {
                        if (err)
                        {
                            console.log( err )
                        }
                        else
                        {
                            fs.writeFile(`../knex/data/notFound/lonelyUnderstatPlayers${GameWeek}.json`, JSON.stringify(passTwoNotFound), err => {
                                if (err)
                                {
                                    console.log( err )
                                }
                            })
                        }
                    })
                }   
            }) 
        })
    )
}

GetFplData( jsonPlayers );

module.exports = { GetFplData }