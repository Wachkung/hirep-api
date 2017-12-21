'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class ReportModels {
    viewReport(knex, query, params) {
        let sql = query;
        return knex.raw(sql, params);
    }
}
exports.ReportModels = ReportModels;
//# sourceMappingURL=view.js.map