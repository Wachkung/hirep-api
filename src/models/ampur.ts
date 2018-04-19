'use strict';
import Knex = require('knex');

export class AmpurModels {
    listall(knex: Knex) {
        return knex('ampur')
            .where('chwpart', 34)
    }
}