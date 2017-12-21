'use strict';

import * as express from 'express';
const router = express.Router();

import { HospInfoModels } from '../models/้hosp_info';
const hospModels = new HospInfoModels();


/* GET home page. */
router.get('/', (req, res, next) => {
  let db = req.db;

  hospModels.listall(db)
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

  let id = req.body.id;
  let header = req.body.header;
  let data = req.body.data;
  let comment = req.body.comment;
  let datas: any = {
    header: header,
    data: data,
    comment: comment
  }

  console.log(datas);

  hospModels.add(db, datas)
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

  let id = req.body.id;
  let header = req.body.header;
  let data = req.body.data;
  let comment = req.body.comment;
  let datas: any = {
    header: header,
    data: data,
    comment: comment
  }

  console.log(datas);

  hospModels.update(db, id, datas)
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

  let id = req.body.id;

  hospModels.del(db, id)
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