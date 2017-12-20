'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const menu_1 = require("../models/menu");
const menuModels = new menu_1.MenuModels();
router.get('/', (req, res, next) => {
    let db = req.db;
    menuModels.listall(db)
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
    let menu_id = req.body.menu_id;
    let menu_name = req.body.menu_name;
    let description = req.body.description;
    let status = req.body.status;
    let datas = {
        menu_name: menu_name,
        description: description,
        status: status
    };
    console.log(datas);
    menuModels.add(db, datas)
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
    let menu_id = req.body.menu_id;
    let menu_name = req.body.menu_name;
    let description = req.body.description;
    let status = req.body.status;
    let datas = {
        menu_name: menu_name,
        description: description,
        status: status
    };
    console.log(datas);
    menuModels.update(db, menu_id, datas)
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
    let menu_id = req.body.menu_id;
    menuModels.del(db, menu_id)
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
//# sourceMappingURL=menu.js.map