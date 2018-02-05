'use strict';
import Knex = require('knex');

export class SubMenuItemModels {
  listall(knex: Knex) {
    return knex('rep_sub_menu_item')
  }

  listone(knex: Knex, sub_item_id: any) {
    return knex('rep_sub_menu_item')
      .where('sub_item_id', sub_item_id);
  }
  listtwo(knex: Knex, item_id: any) {
    return knex('rep_sub_menu_item')
      .where('item_id', item_id);
  }

  add(knex: Knex, data: any) {
    return knex('rep_sub_menu_item')
      .insert(data);
  }

  update(knex: Knex, sub_item_id: any, data: any) {
    return knex('rep_sub_menu_item')
      .where('sub_item_id', sub_item_id)
      .update(data);
  }

  del(knex: Knex, sub_item_id: any) {
    return knex('rep_sub_menu_item')
      .where('sub_item_id', sub_item_id)
      .del();
  }

}