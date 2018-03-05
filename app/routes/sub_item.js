'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const sub_item_1 = require("../models/sub_item");
const subMenuItemModels = new sub_item_1.SubMenuItemModels();
router.get('/', (req, res, next) => {
    let db = req.db;
    subMenuItemModels.listall(db)
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
router.get('/:sub_id', (req, res, next) => {
    let db = req.db;
    let sub_id = req.params.sub_id;
    subMenuItemModels.listone(db, sub_id)
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
router.get('/item/:item_id', (req, res, next) => {
    let db = req.db;
    let item_ids = req.params.item_id;
    let item_id = item_ids.split(",");
    subMenuItemModels.listtwo(db, item_id)
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
    let sub_item_id = req.body.sub_item_id;
    let item_id = req.body.item_id;
    let sub_item_name = req.body.sub_item_name;
    let query_sql = req.body.query_sql;
    let query_params = req.body.query_params;
    let column_selected = req.body.column_selected;
    let template = req.body.template;
    let comment = req.body.comment;
    let sub_item_status = req.body.sub_status;
    let datas = {
        item_id: item_id,
        sub_item_name: sub_item_name,
        query_sql: query_sql,
        query_params: query_params,
        column_selected: column_selected,
        template: template,
        sub_item_status: sub_item_status,
        comment: comment,
    };
    console.log(datas);
    subMenuItemModels.add(db, datas)
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
    let sub_item_id = req.body.sub_item_id;
    let item_id = req.body.item_id;
    let sub_item_name = req.body.sub_item_name;
    let query_sql = req.body.query_sql;
    let query_params = req.body.query_params;
    let column_selected = req.body.column_selected;
    let template = req.body.template;
    let comment = req.body.comment;
    let sub_item_status = req.body.sub_status;
    let datas = {
        item_id: item_id,
        sub_item_name: sub_item_name,
        query_sql: query_sql,
        query_params: query_params,
        column_selected: column_selected,
        template: template,
        sub_item_status: sub_item_status,
        comment: comment,
    };
    console.log(datas);
    subMenuItemModels.update(db, sub_item_id, datas)
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
router.post('/del', (req, res, next) => {
    let db = req.db;
    let sub_item_id = req.body.sub_item_id;
    subMenuItemModels.del(db, sub_item_id)
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
//# sourceMappingURL=sub_item.js.map