'use strict';
import Knex = require('knex');

export class ReportModels {
  viewReport(knex: Knex,query: any,params: any) {
    let sql = query;
    return knex.raw(sql,params)
  }
}