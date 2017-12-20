'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MenuModels {
    listall(knex) {
        return knex('menu');
    }
    add(knex, data) {
        return knex('menu')
            .insert(data);
    }
    update(knex, menu_id, data) {
        return knex('menu')
            .where('menu_id', menu_id)
            .update(data);
    }
    del(knex, menu_id) {
        return knex('menu')
            .where('menu_id', menu_id)
            .del();
    }
}
exports.MenuModels = MenuModels;
//# sourceMappingURL=menu.js.map