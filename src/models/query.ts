'use strict';
import Knex = require('knex');

export class QueryModels {
  listall(knex: Knex) {
    return knex('query_item')
  }

  add(knex: Knex, data: any) {
    return knex('query_item')
      .insert(data);
  }

  update(knex: Knex, menu_id: any, data: any) {
    return knex('query_item')
      .where('query_id', menu_id)
      .update(data);
  }

  del(knex: Knex, menu_id: any) {
    return knex('query_item')
      .where('query_id', menu_id)
      .del();
  }

}