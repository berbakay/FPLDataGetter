const lonelyFplPlayers = require( '../knex/data/notFound/lonelyFplPlayers2.json')
const lonelyUnderstatPlayers = require('../knex/data/notFound/lonelyUnderstatPlayere2.json')

function matchPlayers ( fplPlayers, understatPlayers ) {
    matchedPlayers = {};
    fplPlayers.forEach( fplPlayer => {
        understatPlayers.forEach( understatPlayer => {
            if(fplPlayer.includes( understatPlayer) )
            {
                matchPlayers[fplPlayer] = understatPlayer;
            }
        })
    })
    console.log( matchPlayers);
}

matchPlayers( lonelyFplPlayers, lonelyUnderstatPlayers)