'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const cln_1 = require("../models/cln");
const clnModels = new cln_1.ClnModels();
router.get('/', (req, res, next) => {
    let db = req.db2;
    clnModels.listall(db)
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
//# sourceMappingURL=cln.js.map