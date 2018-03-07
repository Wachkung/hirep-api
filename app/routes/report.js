'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const report_1 = require("../models/report");
const reportModels = new report_1.ReportModels();
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
router.post('/', (req, res, next) => {
    let db = req.db2;
    let sql = req.body.query_sql;
    let paramtype = req.body.query_params;
    if (paramtype) {
        let params = paramtype;
        reportModels.viewReport(db, sql, params)
            .then((results) => {
            res.send({ ok: true, rows: results });
        })
            .catch(error => {
            res.send({ ok: false, error: error });
        })
            .finally(() => {
            db.destroy();
        });
    }
    else {
        reportModels.viewReportNoParam(db, sql)
            .then((results) => {
            res.send({ ok: true, rows: results });
        })
            .catch(error => {
            console.log("cannot result query");
            res.send({ ok: false, error: error });
        })
            .finally(() => {
            db.destroy();
        });
    }
});
exports.default = router;
//# sourceMappingURL=report.js.map