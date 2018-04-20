'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const Knex = require("knex");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const cors = require("cors");
const users_1 = require("./routes/users");
const menu_1 = require("./routes/menu");
const menu_item_1 = require("./routes/menu_item");
const sub_item_1 = require("./routes/sub_item");
const report_1 = require("./routes/report");
const hosp_info_1 = require("./routes/hosp_info");
const reptoday_1 = require("./routes/reptoday");
const ampur_1 = require("./routes/ampur");
const cln_1 = require("./routes/cln");
const mooban_1 = require("./routes/mooban");
const idpm_1 = require("./routes/idpm");
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
let connection = {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
};
let connection2 = {
    host: process.env.DB2_HOST,
    port: +process.env.DB2_PORT,
    database: process.env.DB2_NAME,
    user: process.env.DB2_USER,
    password: process.env.DB2_PASSWORD,
    multipleStatements: true
};
app.use((req, res, next) => {
    req.db = Knex({
        client: 'mysql',
        connection: connection,
        pool: {
            min: 0,
            max: 7,
            afterCreate: (conn, done) => {
                conn.query('SET NAMES utf8', (err) => {
                    done(err, conn);
                });
            }
        },
        debug: true,
        acquireConnectionTimeout: 1500000
    });
    req.db2 = Knex({
        client: 'mysql',
        connection: connection2,
        pool: {
            min: 0,
            max: 7,
            afterCreate: (conn, done) => {
                conn.query('SET NAMES utf8', (err) => {
                    done(err, conn);
                });
            }
        },
        debug: true,
        acquireConnectionTimeout: 1500000
    });
    next();
});
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/menu', menu_1.default);
app.use('/items', menu_item_1.default);
app.use('/subitems', sub_item_1.default);
app.use('/report', report_1.default);
app.use('/setup', hosp_info_1.default);
app.use('/', reptoday_1.default);
app.use('/ampur', ampur_1.default);
app.use('/cln', cln_1.default);
app.use('/mooban', mooban_1.default);
app.use('/idpm', idpm_1.default);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            title: 'error',
            message: err.message,
            error: err
        });
    });
}
app.use((err, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
        title: 'error',
        message: err.message,
        error: {}
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map