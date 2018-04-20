'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const idpm_1 = require("../models/idpm");
const idpmModels = new idpm_1.IdpmModels();
router.get('/', (req, res, next) => {
    let db = req.db2;
    idpmModels.listall(db)
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
//# sourceMappingURL=idpm.js.map