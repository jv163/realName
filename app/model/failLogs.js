/*
 * @Date: 2019-12-02 08:53:10
 * @LastEditors: JV
 * @LastEditTime: 2020-04-30 16:07:29
 */
'use strict';

module.exports = app => {
    const {
        TEXT,
    } = app.Sequelize;

    const FailLogs = app.model.define('fail_logs', {
        "company_name": {
            type: TEXT,
            field: "company_name"
        },
        "delivery_no": {
            type: TEXT,
            field: "delivery_no"
        },
        "data_type": {
            type: TEXT,
            field: "data_type"
        },
        "error_info": {
            type: TEXT,
            field: "error_info"
        },
    }, {
        timestamps: true,
    });

    return FailLogs;
};