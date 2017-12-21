'use strict';

import * as express from 'express';
const router = express.Router();

import { QueryModels } from '../models/query';
const queryModels = new QueryModels();


/* GET home page. */
router.get('/', (req, res, next) => {
  let db = req.db;

  queryModels.listall(db)
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

  let query_id = req.body.menu_id;
  let query_name = req.body.menu_name;
  let query_sql = req.body.query_sql;
  let paramtype = req.body.paramtype;
  let comment = req.body.comment;
  let datas: any = {
    query_name: query_name,
    query_sql: query_sql,
    paramtype: paramtype,
    comment: comment
  }

  console.log(datas);

  queryModels.add(db, datas)
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

  let query_id = req.body.menu_id;
  let query_name = req.body.menu_name;
  let query_sql = req.body.query_sql;
  let paramtype = req.body.paramtype;
  let comment = req.body.comment;
  let datas: any = {
    query_name: query_name,
    query_sql: query_sql,
    paramtype: paramtype,
    comment: comment
  }

  console.log(datas);

  queryModels.update(db, query_id, datas)
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

  let query_id = req.body.query_id;

  queryModels.del(db, query_id)
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