/*
 * @Date: 2019-12-02 08:53:10
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 16:46:41
 */
'use strict';
const moment = require('moment');

module.exports = app => {
    const {
        TEXT,
        DATE,
    } = app.Sequelize;

    const ProcessInfos = app.model.define('process_infos', {
        "delivery_no": {
            type: TEXT,
            field: "delivery_no"
        },
        "create_time": {
            type: DATE,
            get() {
                return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        "process_status": {
            type: TEXT,
            field: "process_status"
        },
        "process_info": {
            type: TEXT,
            field: "process_info"
        },
        "province": {
            type: TEXT,
            field: "province"
        },
        "city": {
            type: TEXT,
            field: "city"
        },
        "district": {
            type: TEXT,
            field: "district"
        },
        "province_source": {
            type: TEXT,
            field: "province_source"
        },
        "city_source": {
            type: TEXT,
            field: "city_source"
        },
        "district_source": {
            type: TEXT,
            field: "district_source"
        },
        "province_target": {
            type: TEXT,
            field: "province_target"
        },
        "city_target": {
            type: TEXT,
            field: "city_target"
        },
        "district_target": {
            type: TEXT,
            field: "district_target"
        },
        "district_address": {
            type: TEXT,
            field: "district_address"
        }
    }, {
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
    });

    return ProcessInfos;
};