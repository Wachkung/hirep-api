'use strict';
import Knex = require('knex');

export class HospInfoModels {
  listall(knex: Knex) {
    return knex('hospital_info')
  }

  add(knex: Knex, data: any) {
    return knex('hospital_info')
      .insert(data);
  }

  update(knex: Knex, id: any, data: any) {
    return knex('hospital_info')
      .where('id', id)
      .update(data);
  }

  del(knex: Knex, id: any) {
    return knex('hospital_info')
      .where('id', id)
      .del();
  }

}