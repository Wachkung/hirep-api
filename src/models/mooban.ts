'use strict';
import Knex = require('knex');

export class MoobanModels {
    listall(knex: Knex,ampur:any) {
        return knex('mooban')
        .where('chwpart', 34)
        .andWhere('ampart',ampur)
      }
}