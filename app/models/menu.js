'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MenuModels {
    listall(knex) {
        return knex('rep_menu');
    }
    add(knex, data) {
        return knex('rep_menu')
            .insert(data);
    }
    update(knex, menu_id, data) {
        return knex('rep_menu')
            .where('menu_id', menu_id)
            .update(data);
    }
    del(knex, menu_id) {
        return knex('rep_menu')
            .where('menu_id', menu_id)
            .del();
    }
}
exports.MenuModels = MenuModels;
//# sourceMappingURL=menu.js.map