'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class AmpurModels {
    listall(knex) {
        return knex('ampur')
            .where('chwpart', 34);
    }
}
exports.AmpurModels = AmpurModels;
//# sourceMappingURL=ampur.js.map