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

router.get('/:item_id', (req, res, next) => {
  let db = req.db;
  let item_id = req.params.item_id;

  subMenuItemModels.listone(db, item_id)
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
  let query_id = req.body.query_id;
  let comment = req.body.comment;
  let sub_item_status = req.body.sub_status;
  let datas: any = {
    item_id: item_id,
    sub_item_name: sub_item_name,
    query_id: query_id,
    sub_item_status: sub_item_status,
    comment: comment
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
  let query_id = req.body.query_id;
  let comment = req.body.comment;
  let sub_item_status = req.body.sub_status;
  let datas: any = {
    item_id: item_id,
    sub_item_name: sub_item_name,
    query_id: query_id,
    sub_item_status: sub_item_status,
    comment: comment
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
router.delete('/', (req, res, next) => {
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