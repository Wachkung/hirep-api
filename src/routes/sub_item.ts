'use strict';

import * as express from 'express';
const router = express.Router();

import { SubMenuItemModels } from '../models/sub_item';
const subMenuItemModels = new SubMenuItemModels();


/* GET home page. */
router.get('/', (req, res, next) => {
  let db = req.db;

  subMenuItemModels.listall(db)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    })
});

router.get('/:sub_id', (req, res, next) => {
  let db = req.db;
  let sub_id = req.params.sub_id;

  subMenuItemModels.listone(db, sub_id)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    })
});

router.post('/', (req, res, next) => {
  let db = req.db;

  let sub_item_id = req.body.sub_id;
  let item_id = req.body.item_id;
  let sub_item_name = req.body.sub_name;
  let query_sql = req.body.query_id;
  let query_params = req.body.query_params;
  let template = req.body.template;
  let comment = req.body.comment;
  let sub_item_status = req.body.sub_status;
  let user_level = req.body.level;
  let datas: any = {
    item_id: item_id,
    sub_item_name: sub_item_name,
    query_sql: query_sql,
    query_params: query_params,
    template: template,
    sub_item_status: sub_item_status,
    comment: comment,
    user_level: user_level
  }

  console.log(datas);

  subMenuItemModels.add(db, datas)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error });
    })
    .finally(() => {
      db.destroy();
    })
})

router.put('/', (req, res, next) => {
  let db = req.db;

  let sub_item_id = req.body.sub_id;
  let item_id = req.body.item_id;
  let sub_item_name = req.body.sub_name;
  let query_sql = req.body.query_id;
  let query_params = req.body.query_params;
  let template = req.body.template;
  let comment = req.body.comment;
  let sub_item_status = req.body.sub_status;
  let user_level = req.body.level;
  let datas: any = {
    item_id: item_id,
    sub_item_name: sub_item_name,
    query_sql: query_sql,
    query_params: query_params,
    template: template,
    sub_item_status: sub_item_status,
    comment: comment,
    user_level: user_level
  }

  console.log(datas);

  subMenuItemModels.update(db, sub_item_id, datas)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error });
    })
    .finally(() => {
      db.destroy();
    })
})
router.post('/del', (req, res, next) => {
  let db = req.db;

  let sub_item_id = req.body.sub_item_id;

  subMenuItemModels.del(db, sub_item_id)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error });
    })
    .finally(() => {
      db.destroy();
    })
})


export default router;