'use strict';

import * as express from 'express';
const router = express.Router();

import { MenuItemModels } from '../models/menu_item';
const menuItemModels = new MenuItemModels();


/* GET home page. */
router.get('/', (req, res, next) => {
  let db = req.db;

  menuItemModels.listall(db)
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

router.get('/:menu_id', (req, res, next) => {
  let db = req.db;
  let menu_id = req.params.menu_id;

  menuItemModels.listone(db, menu_id)
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

  let menu_id = req.body.menu_id;
  let item_name = req.body.item_name;
  let comment = req.body.comment;
  let item_status = req.body.item_status;
  let datas: any = {
    menu_id: menu_id,
    item_name: item_name,
    item_status: item_status,
    comment: comment
  }

  console.log(datas);

  menuItemModels.add(db, datas)
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

  let item_id = req.body.item_id;
  let menu_id = req.body.menu_id;
  let item_name = req.body.item_name;
  let comment = req.body.comment;
  let item_status = req.body.item_status;
  let datas: any = {
    menu_id: menu_id,
    item_name: item_name,
    item_status: item_status,
    comment: comment
  }

  console.log(datas);

  menuItemModels.update(db, item_id, datas)
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
//router.delete('/:varitem_id', (req, res, next) => {
  router.post('/del', (req, res, next) => {

  let db = req.db;
  let item_id = req.body.item_id;
  console.log(item_id);
  menuItemModels.del(db, item_id)
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