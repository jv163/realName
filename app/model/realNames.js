/*
 * @Date: 2019-12-02 08:53:10
 * @LastEditors: JV
 * @LastEditTime: 2020-04-15 11:02:46
 */
'use strict';
const moment = require('moment');

module.exports = app => {
    const {
        TEXT,
        DATE,
    } = app.Sequelize;

    const RealNames = app.model.define('real_names', {
        "delivery_no": {
            type: TEXT,
            field: "delivery_no"
        },
        "province": {
            type: TEXT,
            field: "province"
        },
        "city": {
            type: TEXT,
            field: "city"
        },
        "s_address": {
            type: TEXT,
            field: "s_address"
        },
        "s_name": {
            type: TEXT,
            field: "s_name"
        },
        "s_phone": {
            type: TEXT,
            field: "s_phone"
        },
        "s_sid": {
            type: TEXT,
            field: "s_sid"
        },
        "s_sex": {
            type: TEXT,
            field: "s_sex"
        },
        "s_nationality": {
            type: TEXT,
            field: "s_nationality"
        },
        "r_address": {
            type: TEXT,
            field: "r_address"
        },
        "r_name": {
            type: TEXT,
            field: "r_name"
        },
        "r_phone": {
            type: TEXT,
            field: "r_phone"
        },
        "r_sid": {
            type: TEXT,
            field: "r_sid"
        },
        "r_sex": {
            type: TEXT,
            field: "r_sex"
        },
        "p_name": {
            type: TEXT,
            field: "p_name"
        },
        "p_sid": {
            type: TEXT,
            field: "p_sid"
        },
        "p_phone": {
            type: TEXT,
            field: "p_phone"
        },
        "create_time": {
            type: DATE,
            get() {
                return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        "timestamp": {
            type: DATE,
            get() {
                return moment(this.getDataValue('timestamp')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        "description": {
            type: TEXT,
            field: "description"
        },
        "company": {
            type: TEXT,
            field: "company"
        },
        "branch": {
            type: TEXT,
            field: "branch"
        },
        "brand": {
            type: TEXT,
            field: "brand"
        },
        "type": {
            type: TEXT,
            field: "type"
        },
        "order_id": {
            type: TEXT,
            field: "order_id"
        },
        "s_regarea": {
            type: TEXT,
            field: "s_regarea"
        },
        "r_regarea": {
            type: TEXT,
            field: "r_regarea"
        },
        "access_branch": {
            type: TEXT,
            field: "access_branch"
        },
        "access_time": {
            type: DATE,
            get() {
                return moment(this.getDataValue('access_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        "access_postman": {
            type: TEXT,
            field: "access_postman"
        },
        "access_phone": {
            type: TEXT,
            field: "access_phone"
        },
        "access_sid": {
            type: TEXT,
            field: "access_sid"
        },
        "weight": {
            type: TEXT,
            field: "weight"
        },
        "pay": {
            type: TEXT,
            field: "pay"
        },
        "pay_type": {
            type: TEXT,
            field: "pay_type"
        },
    }, {
        timestamps: true,
    });

    return RealNames;
};