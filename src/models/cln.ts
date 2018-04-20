'use strict';
import Knex = require('knex');

export class ClnModels {
    listall(knex: Knex) {
        return knex('cln')
         
      }
}