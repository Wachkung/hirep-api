'use strict';
import Knex = require('knex');

export class MenuModels {
  listall(knex: Knex) {
    return knex('rep_menu')
  }

  add(knex: Knex, data: any) {
    return knex('rep_menu')
      .insert(data);
  }

  update(knex: Knex, menu_id: any, data: any) {
    return knex('rep_menu')
      .where('menu_id', menu_id)
      .update(data);
  }

  del(knex: Knex, menu_id: any) {
    return knex('rep_menu')
      .where('menu_id', menu_id)
      .del();
  }

}