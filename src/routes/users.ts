'use strict';

import * as express from 'express';
const router = express.Router();

import { UsersModels } from '../models/users';
const userModels = new UsersModels();


/* GET home page. */
router.get('/', (req, res, next) => {
    let db = req.db;

    userModels.listall(db)
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

router.post('/login', (req, res, next) => {
    let db = req.db;
    let username = req.body.username;
    let password = req.body.password;

    userModels.login(db, username, password)
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

    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let device_token = req.body.device_token;
    let is_accept = req.body.is_accept;
    let datas: any = {
        fullname: fullname,
        username: username,
        password: password,
        device_token: device_token,
        is_accept: is_accept
    }
    console.log(datas);

    userModels.add(db, datas)
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

    let id_user = req.body.id_user;
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let device_token = req.body.device_token;
    let is_accept = req.body.is_accept;
    let datas: any = {
        fullname: fullname,
        username: username,
        password: password,
        device_token: device_token,
        is_accept: is_accept
    }

    console.log(datas);

    userModels.update(db, id_user, datas)
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

    let id_user = req.body.id_user;

    userModels.del(db, id_user)
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