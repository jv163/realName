/*
 * @Date: 2019-12-02 08:53:10
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 17:04:40
 */
'use strict';
const moment = require('moment');

module.exports = app => {
    const {
        TEXT,
        BOOLEAN,
    } = app.Sequelize;

    const Users = app.model.define('users', {
        "account": {
            type: TEXT,
            field: "account"
        },
        "password": {
            type: TEXT,
            field: "password"
        },
        "status": {
            type: BOOLEAN,
            defaultValue: true,
            field: "status"
        },
    }, {
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
    });

    return Users;
};