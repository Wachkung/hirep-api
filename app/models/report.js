'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class ReportModels {
    viewReport(knex, query, params) {
        let sql = query;
        return knex.raw(sql, params);
    }
    viewReportNoParam(knex, query) {
        let sql = query;
        return knex.raw(sql);
    }
}
exports.ReportModels = ReportModels;
//# sourceMappingURL=report.js.map