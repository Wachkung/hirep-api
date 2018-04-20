'use strict';
import Knex = require('knex');

export class IdpmModels {
    listall(knex: Knex) {
        return knex('idpm')
         
      }
}