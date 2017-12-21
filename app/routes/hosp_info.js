'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const _hosp_info_1 = require("../models/\u0E49hosp_info");
const hospModels = new _hosp_info_1.HospInfoModels();
router.get('/', (req, res, next) => {
    let db = req.db;
    hospModels.listall(db)
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
router.post('/', (req, res, next) => {
    let db = req.db;
    let id = req.body.id;
    let header = req.body.header;
    let data = req.body.data;
    let comment = req.body.comment;
    let datas = {
        header: header,
        data: data,
        comment: comment
    };
    console.log(datas);
    hospModels.add(db, datas)
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
router.put('/', (req, res, next) => {
    let db = req.db;
    let id = req.body.id;
    let header = req.body.header;
    let data = req.body.data;
    let comment = req.body.comment;
    let datas = {
        header: header,
        data: data,
        comment: comment
    };
    console.log(datas);
    hospModels.update(db, id, datas)
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
router.delete('/', (req, res, next) => {
    let db = req.db;
    let id = req.body.id;
    hospModels.del(db, id)
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
//# sourceMappingURL=hosp_info.js.map