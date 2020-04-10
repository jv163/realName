/*
 * @Date: 2020-01-03 10:41:42
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 17:10:17
 */
'use strict';

//初始化登入账号
module.exports = app => {
    app.beforeStart(async () => {
        const ctx = app.createAnonymousContext();
        await ctx.service.user.initUser();
    });
};