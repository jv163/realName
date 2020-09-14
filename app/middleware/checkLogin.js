/*
 * @Date: 2020-04-10 16:51:15
 * @LastEditors: JV
 * @LastEditTime: 2020-04-22 17:25:41
 */
'use strict';

const apiWhiteList = require('../dict/apiWhiteList');
module.exports = options => {
    return async function checkLogin(ctx, next) {
        try {
            const url = ctx.request.url.split('?')[0];
            //访问白名单(免登陆)
            let ispass = apiWhiteList.findIndex((item) => item == url);
            if (ispass <= -1) {
                const user = ctx.session.user;
                if (!user) {
                    ctx.body = {
                        code: 11001,
                        message: "未登录",
                    }
                    return
                }
            }
        } catch (error) {
            ctx.logger.error('mid=>checkLogin:', error);
            ctx.body = {
                code: 500,
                message: '系统错误'
            }
        }
        await next();
    };
};