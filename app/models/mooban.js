'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MoobanModels {
    listall(knex) {
        return knex('mooban')
            .where('chwpart', 34);
    }
}
exports.MoobanModels = MoobanModels;
//# sourceMappingURL=mooban.js.map