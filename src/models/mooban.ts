'use strict';
import Knex = require('knex');

export class MoobanModels {
    listall(knex: Knex) {
        return knex('mooban')
        .where('chwpart', 34)
      }
}