1) Go to undertstat.com filter down to the data you want and copy source code and apste in to html file in WeeklyStats Directory

2) Change the week number in webScraper.js 

3) knex migrate:make weekn

4) Copy file info from previous week and update TableName variable

5) knex migrate:latest

5) knex seed:make weekn --env development

6) copy file info from previous week and update Week variable

6) knext seed:run --specific=seed-weekn.js