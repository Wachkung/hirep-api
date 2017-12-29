'use strict';

import * as express from 'express';
const router = express.Router();

import { MenuModels } from '../models/menu';
const menuModels = new MenuModels();


/* GET home page. */
router.get('/', (req, res, next) => {
  let db = req.db;

  menuModels.listall(db)
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
  let menu_name = req.body.menu_name;
  let description = req.body.description;
  let status = req.body.status;
  let rout = req.body.rout;
  let datas: any = {
    menu_name: menu_name,
    description: description,
    status: status,
    rout: rout
  }

  console.log(datas);

  menuModels.add(db, datas)
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

  let menu_id = req.body.menu_id;
  let menu_name = req.body.menu_name;
  let description = req.body.description;
  let status = req.body.status;
  let rout = req.body.rout;
  let datas: any = {
    menu_name: menu_name,
    description: description,
    status: status,
    rout: rout
  }

  console.log(datas);

  menuModels.update(db, menu_id, datas)
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

  let menu_id = req.body.menu_id;

  menuModels.del(db, menu_id)
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