'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class HospInfoModels {
    listall(knex) {
        return knex('hospital_info');
    }
    add(knex, data) {
        return knex('hospital_info')
            .insert(data);
    }
    update(knex, id, data) {
        return knex('hospital_info')
            .where('id', id)
            .update(data);
    }
    del(knex, id) {
        return knex('hospital_info')
            .where('id', id)
            .del();
    }
}
exports.HospInfoModels = HospInfoModels;
//# sourceMappingURL=้hosp_info.js.map