'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class SubMenuItemModels {
    listall(knex) {
        return knex('rep_sub_menu_item');
    }
    listone(knex, sub_item_id) {
        return knex('rep_sub_menu_item')
            .where('sub_item_id', sub_item_id);
    }
    listtwo(knex, item_id) {
        return knex('rep_sub_menu_item')
            .where('item_id', item_id);
    }
    add(knex, data) {
        return knex('rep_sub_menu_item')
            .insert(data);
    }
    update(knex, sub_item_id, data) {
        return knex('rep_sub_menu_item')
            .where('sub_item_id', sub_item_id)
            .update(data);
    }
    del(knex, sub_item_id) {
        return knex('rep_sub_menu_item')
            .where('sub_item_id', sub_item_id)
            .del();
    }
}
exports.SubMenuItemModels = SubMenuItemModels;
//# sourceMappingURL=sub_item.js.map