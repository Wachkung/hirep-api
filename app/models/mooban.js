'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MoobanModels {
    listall(knex, ampur) {
        return knex('mooban')
            .where('chwpart', 34)
            .andWhere('ampart', ampur);
    }
}
exports.MoobanModels = MoobanModels;
//# sourceMappingURL=mooban.js.map