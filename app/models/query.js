'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class QueryModels {
    listall(knex) {
        return knex('query_item');
    }
    add(knex, data) {
        return knex('query_item')
            .insert(data);
    }
    update(knex, menu_id, data) {
        return knex('query_item')
            .where('query_id', menu_id)
            .update(data);
    }
    del(knex, menu_id) {
        return knex('query_item')
            .where('query_id', menu_id)
            .del();
    }
}
exports.QueryModels = QueryModels;
//# sourceMappingURL=query.js.map