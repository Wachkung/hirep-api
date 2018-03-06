'use strict';

import * as express from 'express';
const router = express.Router();

import { ReportModels } from '../models/report';
const reportModels = new ReportModels();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {
    let db = req.db;

    let sql = req.body.query_sql;
    let paramtype = req.body.query_params;
    // console.log(sql);
    // console.log(paramtype);

    if (paramtype) {
        //let params: any[] = paramtype.split(",");
        let params: any[] = paramtype;
        //console.log(params);
        reportModels.viewReport(db, sql, params)
            .then((results: any) => {
                res.send({ ok: true, rows: results });
            })
            .catch(error => {
                res.send({ ok: false, error: error });
            })
            .finally(() => {
                db.destroy();
            })
    } else {
        reportModels.viewReportNoParam(db, sql)
            .then((results: any) => {
                res.send({ ok: true, rows: results });
            })
            .catch(error => {
                console.log("cannot result query");
                res.send({ ok: false, error: error });
            })
            .finally(() => {
                db.destroy();
            })
    }
})

export default router;