/*
 * @Date: 2019-12-02 08:53:10
 * @LastEditors: JV
 * @LastEditTime: 2020-04-13 18:13:54
 */
'use strict';
const moment = require('moment');

module.exports = app => {
    const {
        TEXT,
        BOOLEAN,
    } = app.Sequelize;

    const CompanyInfos = app.model.define('companys', {
        "company_name": {
            type: TEXT,
            field: "company_name"
        },
        "secret_id": {
            type: TEXT,
            field: "secret_id"
        },
        "public_key": {
            type: TEXT,
            field: "public_key"
        },
        "private_key": {
            type: TEXT,
            field: "private_key"
        },
        "status": {
            type: BOOLEAN,
            defaultValue: true,
            field: "status"
        },
    }, {
        timestamps: true,
    });

    return CompanyInfos;
};