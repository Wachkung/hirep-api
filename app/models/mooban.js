'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MoobanModels {
    listall(knex, ampur) {
        return knex('mooban')
            .where('chwpart', 34)
            .andWhere('amppart', ampur)
            .groupBy('hospsub');
    }
}
exports.MoobanModels = MoobanModels;
//# sourceMappingURL=mooban.js.map