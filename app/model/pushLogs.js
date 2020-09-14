/*
 * @Date: 2020-04-15 16:46:09
 * @LastEditors: JV
 * @LastEditTime: 2020-04-16 18:48:15
 */

/*
 * @Date: 2019-12-02 08:53:10
 * @LastEditors: JV
 * @LastEditTime: 2020-04-16 10:10:48
 */
'use strict';

module.exports = app => {
    const {
        TEXT,
        JSON,
        BOOLEAN,
    } = app.Sequelize;

    const PushLogs = app.model.define('push_logs', {
        "secret_id": {
            type: TEXT,
            field: "secret_id"
        },
        "company_name": {
            type: TEXT,
            field: "company_name"
        },
        "body": {
            type: JSON,
            field: "body"
        },
        "url": {
            type: TEXT,
            field: "url"
        },
        "status": {
            type: BOOLEAN,
            field: "status"
        },
        "result": {
            type: JSON,
            field: "result"
        },

    }, {
        timestamps: true,
    });

    return PushLogs;
};