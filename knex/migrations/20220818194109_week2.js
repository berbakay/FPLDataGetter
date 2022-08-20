/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


 const { gameWeek } = require('../../globalVariables')
 const TableName = `week${gameWeek}`;
 
 exports.up = function(knex) {
     console.log('creating tables....')
     return knex.schema.createTable(`${TableName}`, ( table ) => {
         table.integer('id').primary();
         table.string('player_name').notNullable();
         table.integer('games').notNullable();
         table.integer('time').notNullable();
         table.integer('goals').notNullable();
         table.double('xG').notNullable();
         table.integer('assists').notNullable();
         table.double('xA').notNullable();
         table.integer('shots').notNullable();
         table.integer('key_passes').notNullable();
         table.integer('yellow_cards').notNullable();
         table.integer('red_cards').notNullable();
         table.string('position').notNullable();
         table.string('team_title').notNullable();
         table.integer('npg').notNullable();
         table.double('npxG').notNullable();
         table.double('xGChain').notNullable();
         table.double('xGBuildup').notNullable();
         table.integer('opponent_team');
         table.integer('total_points');
         table.boolean('was_home');
         table.integer('goals_conceded');
         table.integer('saves');
         table.integer('bonus');
         table.integer('bps');
         table.integer('clean_sheets');
         table.integer('value');
         table.integer('selected');
         table.integer('transfers_balance');
   });
 };
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 exports.down = function(knex) {
     return knex.schema.dropTable(`${TableName}`)
 };
 