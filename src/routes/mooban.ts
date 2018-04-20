'use strict';

import * as express from 'express';
const router = express.Router();

import { MoobanModels } from '../models/mooban';
const moobanModels = new MoobanModels();

router.get('/:ampur', (req, res, next) => {
  let db = req.db2;
  let ampur = req.params.ampur;

  moobanModels.listall(db, ampur)
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