'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const ampur_1 = require("../models/ampur");
const ampurModels = new ampur_1.AmpurModels();
router.get('/', (req, res, next) => {
    let db = req.db2;
    ampurModels.listall(db)
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
//# sourceMappingURL=ampur.js.map