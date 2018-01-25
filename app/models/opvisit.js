'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class OpVisitModels {
    listall(knex) {
        return knex('rep_sub_menu_item')
            .where('item_id', 1);
    }
}
exports.OpVisitModels = OpVisitModels;
//# sourceMappingURL=opvisit.js.map