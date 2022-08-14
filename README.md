1) Go to undertstat.com filter down to the data you want and copy source code and apste in to html file in UnderstatWeeklyHTML Directory as week number x.html

2) Change the week number globalVariable to weekn

3) run FormatUnderStatHTML.js

4) run AddFPlDataToJson.js

3) knex migrate:make weekn

4) In the newly created migration file Copy file info from previous week

5) knex migrate:latest

5) knex seed:make weekn --env development

6) In newly created seed file copy file info from previous week

6) knex seed:run --specific=weekn.js