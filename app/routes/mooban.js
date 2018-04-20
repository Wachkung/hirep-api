'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const mooban_1 = require("../models/mooban");
const moobanModels = new mooban_1.MoobanModels();
router.get('/', (req, res, next) => {
    let db = req.db2;
    moobanModels.listall(db)
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
//# sourceMappingURL=mooban.js.map