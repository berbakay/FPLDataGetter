/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

 const Week = 1
 const WeekData = require(`../data/2223data/${Week}.js`);

 const seed = function(knex) {
   console.log('inserting.....')
   console.log(WeekData);
   return knex(`week${Week}`).insert(
     WeekData
   )
   .returning('*')
   };
 
   module.exports = { seed };