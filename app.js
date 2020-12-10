/*
 * @Date: 2020-01-03 10:41:42
 * @LastEditors: JV
 * @LastEditTime: 2020-12-10 15:57:02
 */
'use strict';

const moment = require('moment');

//初始化
module.exports = app => {
    app.beforeStart(async () => {
        var ctx = app.createAnonymousContext();
        try {
            await ctx.service.dbTable.initTable();
            await ctx.service.user.initUser();
            const node = moment().add(1, 'months').format('YYYYMM'),
                format_node = moment().add(1, 'months').format('YYYY-MM-01'),
                next_format_node = moment().add(2, 'months').format('YYYY-MM-01');
            await ctx.service.dbTable.createMonthPartitionTable(node, format_node, next_format_node);
        } catch (error) {
            ctx.logger.error(error);
        }
    });
};