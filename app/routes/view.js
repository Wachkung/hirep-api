'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const view_1 = require("../models/view");
const viewModels = new view_1.ViewModels();
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
router.post('/', (req, res, next) => {
    let db = req.db;
    let sql = req.body.sql;
    let params = req.body.paramtype;
    viewModels.viewReport(db, sql, params)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
exports.default = router;
//# sourceMappingURL=view.js.map