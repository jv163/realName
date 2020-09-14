/*
 * @Date: 2020-01-03 10:41:42
 * @LastEditors: JV
 * @LastEditTime: 2020-04-20 10:03:09
 */
'use strict';

//初始化
module.exports = app => {
    app.beforeStart(async () => {
        var ctx = app.createAnonymousContext();
        try {
            await ctx.service.dbTable.initTable();
            await ctx.service.user.initUser();
            await ctx.service.dbTable.createMonthPartitionTable('month');
        } catch (error) {
            ctx.logger.error(error);
        }
    });
};