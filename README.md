1) Go to undertstat.com filter down to the data you want and copy source code and apste in to html file in UnderstatWeeklyHTML Directory as week number n.html

2) Change the week number globalVariable to weekn

3) run FormatUnderStatHTML.js

4) run AddFPlDataToJson.js ( the api is a bit temperamental so you may need to do this a couple of times )

5) check the understat lonely player file and ammend the lonelyPlayerName file until it's clear

6) run AddPositions and check if any players missing positions, edit positions.js file and run again if needs be

7) knex migrate:make weekn

8) In the newly created migration file Copy file info from previous week

9) knex migrate:latest

10) knex seed:make weekn --env development

11) In newly created seed file copy file info from previous week

12) knex seed:run --specific=weekn.js