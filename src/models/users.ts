'use strict';
import Knex = require('knex');

export class UsersModels {
    listall(knex: Knex) {
        return knex('users')
    }

    add(knex: Knex, data: any) {
        return knex('users')
            .insert(data);
    }

    update(knex: Knex, id_user: any, data: any) {
        return knex('users')
            .where('id_user', id_user)
            .update(data);
    }

    del(knex: Knex, id_user: any) {
        return knex('users')
        .where('id_user', id_user)
        .del();
    }

}

