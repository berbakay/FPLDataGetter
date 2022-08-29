const json = require('../knex/data/4.json')


function loopallplayers( json ) {
    const ids = [];
    json.forEach( player => {
        if( ids.includes( player.id ) )
        {
            console.log(player.id)
        }
        else
        {
            ids.push(player.id);
        }  
    })
}

loopallplayers( json );