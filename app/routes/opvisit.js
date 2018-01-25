'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const opvisit_1 = require("../models/opvisit");
const opVisitModels = new opvisit_1.OpVisitModels();
router.get('/', (req, res, next) => {
    let db = req.db;
    opVisitModels.listall(db)
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
//# sourceMappingURL=opvisit.js.map