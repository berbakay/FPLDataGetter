/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const lastSeasonData  = require('../data/2122data/2122data');

const seed = function(knex) {
  console.log('inserting.....')
  console.log(lastSeasonData);
  return knex('data2122').insert(
    lastSeasonData
  )
  .returning('*')
  };

  module.exports = { seed };