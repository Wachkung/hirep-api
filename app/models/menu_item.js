'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MenuItemModels {
    listall(knex) {
        return knex('rep_menu_item');
    }
    listone(knex, menu_id) {
        return knex('rep_menu_item')
            .where('menu_id', menu_id);
    }
    add(knex, data) {
        return knex('rep_menu_item')
            .insert(data);
    }
    update(knex, item_id, data) {
        return knex('rep_menu_item')
            .where('item_id', item_id)
            .update(data);
    }
    del(knex, item_id) {
        return knex('rep_menu_item')
            .where('item_id', item_id)
            .del();
    }
}
exports.MenuItemModels = MenuItemModels;
//# sourceMappingURL=menu_item.js.map