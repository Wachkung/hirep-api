'use strict';

import * as express from 'express';
const router = express.Router();

import { IdpmModels } from '../models/idpm';
const idpmModels = new IdpmModels();

router.get('/', (req, res, next) => {
    let db = req.db2;
  
    idpmModels.listall(db)
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
  export default router;