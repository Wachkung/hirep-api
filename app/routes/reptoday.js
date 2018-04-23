'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const reptoday_1 = require("../models/reptoday");
const reptoday = new reptoday_1.ReptodayModels();
router.get('/today', (req, res, next) => {
    let db2 = req.db2;
    reptoday.today(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todayipt', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todayipt(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todaytype', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todaytype(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todaytotal', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todaytotal(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/revier', (req, res, next) => {
    let db2 = req.db2;
    reptoday.revier(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/opicdtm', (req, res, next) => {
    let db2 = req.db2;
    reptoday.opicdtm(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/ericdtm', (req, res, next) => {
    let db2 = req.db2;
    reptoday.ericdtm(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/dticdtm', (req, res, next) => {
    let db2 = req.db2;
    reptoday.dticdtm(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/iptnum', (req, res, next) => {
    let db2 = req.db2;
    reptoday.iptnum(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/reopuc', (req, res, next) => {
    let db2 = req.db2;
    reptoday.reopuc(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/reipuc', (req, res, next) => {
    let db2 = req.db2;
    reptoday.reipuc(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/overvisit', (req, res, next) => {
    let db2 = req.db2;
    reptoday.overvisit(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/overadmin', (req, res, next) => {
    let db2 = req.db2;
    reptoday.overadmin(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/typetotal/:startdate/:enddate', (req, res, next) => {
    let db2 = req.db2;
    let startdate = req.params.startdate;
    let enddate = req.params.enddate;
    reptoday.typetotal(db2, startdate, enddate)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.post('/typetotal', (req, res, next) => {
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let db2 = req.db2;
    reptoday.typetotal(db2, startdate, enddate)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/bed', (req, res, next) => {
    let db2 = req.db2;
    reptoday.bed(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todayreferout', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todayreferout(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todayreferback', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todayreferback(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todayrefersocial', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todayrefersocial(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todayopddead', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todayopddead(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todayipddead', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todayipddead(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todaylrbrith', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todaylrbrith(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
router.get('/todaylrwait', (req, res, next) => {
    let db2 = req.db2;
    reptoday.todaylrwait(db2)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db2.destroy();
    });
});
exports.default = router;
//# sourceMappingURL=reptoday.js.map