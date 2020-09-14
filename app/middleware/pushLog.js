/*
 * @Date: 2020-04-10 16:51:15
 * @LastEditors: JV
 * @LastEditTime: 2020-04-22 17:31:12
 */
'use strict';

module.exports = options => {
    return async function pushLog(ctx, next) {
        await next();
        try {
            const url = ctx.request.url.split('?')[0],
                body = ctx.request.body,
                secret_id = ctx.request.body.secret_id || '',
                result = ctx.body,
                code = ctx.body.code;
            delete body.data_obj;
            let status = false;
            if (code === 200) status = true;
            const docs = {
                body,
                url,
                secret_id,
                status,
                result
            }
            const company_info = await ctx.service.company.findCompany({
                where: {
                    secret_id,
                }
            })
            if (company_info.length > 0) {
                docs.company_name = company_info[0].company_name;
            }
            await ctx.service.pushLog.createLog(docs);
        } catch (error) {
            ctx.logger.error('mid=>pushLog:', error);
            ctx.body = {
                code: 500,
                message: '系统错误'
            }
        }

    };
};