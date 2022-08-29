/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

 const { gameWeek } = require('../../globalVariables')

 const Week = gameWeek
 const WeekData = require(`../data/${Week}.json`);

 const seed = function(knex) {
   console.log('inserting.....')
   return knex(`week${Week}`).insert(
     WeekData
   )
   .returning('*')
   
   };
 
   module.exports = { seed };