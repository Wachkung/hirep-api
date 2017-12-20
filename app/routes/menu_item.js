'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const menu_item_1 = require("../models/menu_item");
const menuItemModels = new menu_item_1.MenuItemModels();
router.get('/', (req, res, next) => {
    let db = req.db;
    menuItemModels.listall(db)
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
    let item_name = req.body.item_name;
    let comment = req.body.comment;
    let item_status = req.body.item_status;
    let datas = {
        menu_id: menu_id,
        item_name: item_name,
        item_status: item_status,
        comment: comment
    };
    console.log(datas);
    menuItemModels.add(db, datas)
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
    let item_id = req.body.item_id;
    let menu_id = req.body.menu_id;
    let item_name = req.body.item_name;
    let comment = req.body.comment;
    let item_status = req.body.item_status;
    let datas = {
        menu_id: menu_id,
        item_name: item_name,
        item_status: item_status,
        comment: comment
    };
    console.log(datas);
    menuItemModels.update(db, item_id, datas)
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
    let item_id = req.body.item_id;
    menuItemModels.del(db, item_id)
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
//# sourceMappingURL=menu_item.js.map