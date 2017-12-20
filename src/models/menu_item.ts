'use strict';
import Knex = require('knex');

export class MenuItemModels {
  listall(knex: Knex) {
    return knex('menu_item')
  }

  add(knex: Knex, data: any) {
    return knex('menu_item')
      .insert(data);
  }

  update(knex: Knex, item_id: any, data: any) {
    return knex('menu_item')
      .where('item_id', item_id)
      .update(data);
  }

  del(knex: Knex, item_id: any) {
    return knex('menu_item')
      .where('item_id', item_id)
      .del();
  }

}