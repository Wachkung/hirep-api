'use strict';

import * as express from 'express';
const router = express.Router();

import { ReportModels } from '../models/report';
const reportModels = new ReportModels();

/* GET home page. */
router.get('/',(req,res,next) => {
  res.render('index', {title: 'Express'});
});

router.post('/', (req, res, next) => {
  let db = req.db;
  
  let sql = req.body.sql;
    let paramtype = req.body.paramtype;
    let params: any[] = paramtype.split(",");


  reportModels.viewReport(db, sql, params)
      .then((results: any) => {
          res.send({ ok: true, rows: results[0] });
      })
      .catch(error => {
          res.send({ ok: false, error: error });
      })
      .finally(() => {
          db.destroy();
      })
})

export default router;