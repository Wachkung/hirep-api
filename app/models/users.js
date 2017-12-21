'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class UsersModels {
    listall(knex) {
        return knex('users');
    }
    login(knex, username, password) {
        return knex('users')
            .where('username', username)
            .where('password', password);
    }
    add(knex, data) {
        return knex('users')
            .insert(data);
    }
    update(knex, id_user, data) {
        return knex('users')
            .where('id_user', id_user)
            .update(data);
    }
    del(knex, id_user) {
        return knex('users')
            .where('id_user', id_user)
            .del();
    }
}
exports.UsersModels = UsersModels;
//# sourceMappingURL=users.js.map