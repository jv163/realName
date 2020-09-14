/*
 * @Date: 2019-12-02 08:53:10
 * @LastEditors: JV
 * @LastEditTime: 2020-04-15 16:46:36
 */
'use strict';

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
    });

    return Users;
};