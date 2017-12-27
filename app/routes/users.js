'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const users_1 = require("../models/users");
const userModels = new users_1.UsersModels();
router.get('/', (req, res, next) => {
    let db = req.db;
    userModels.listall(db)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
router.post('/login', (req, res, next) => {
    let db = req.db;
    let username = req.body.username;
    let password = req.body.password;
    userModels.login(db, username, password)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
router.post('/', (req, res, next) => {
    let db = req.db;
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let device_token = req.body.device_token;
    let is_accept = req.body.is_accept;
    let datas = {
        fullname: fullname,
        username: username,
        password: password,
        device_token: device_token,
        is_accept: is_accept
    };
    console.log(datas);
    userModels.add(db, datas)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
router.put('/', (req, res, next) => {
    let db = req.db;
    let id_user = req.body.id_user;
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let device_token = req.body.device_token;
    let is_accept = req.body.is_accept;
    let datas = {
        fullname: fullname,
        username: username,
        password: password,
        device_token: device_token,
        is_accept: is_accept
    };
    console.log(datas);
    userModels.update(db, id_user, datas)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
router.post('/del', (req, res, next) => {
    let db = req.db;
    let id_user = req.body.id_user;
    userModels.del(db, id_user)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map