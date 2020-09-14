/*
 * @Date: 2019-11-28 17:17:00
 * @LastEditors: JV
 * @LastEditTime: 2020-05-22 16:45:51
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */

//签名校验
'use strict';

const crypto = require('../utils/crypto');

module.exports = options => {
    return async function signCheck(ctx, next) {
        try {
            //参数校验
            if (!ctx.request.body.secret_id ||
                !ctx.request.body.sign
            ) {
                ctx.body = {
                    code: 10000,
                    message: "参数不完整或者格式错误",
                }
                return
            }
            const {
                secret_id,
                sign
            } = ctx.request.body;
            var company_info = await ctx.app.redis.get(`company_info_${secret_id}`);

            if (!company_info) {
                var company_infos = await ctx.service.company.findCompany({
                    where: {
                        secret_id,
                    }
                })

                if (company_infos.length <= 0) {
                    ctx.body = {
                        code: 13001,
                        message: "secret_id无效或错误",
                    }
                    return
                } else {
                    company_info = company_infos[0];
                    await ctx.app.redis.set(`company_info_${secret_id}`, JSON.stringify(company_infos[0]));
                }
            } else {
                company_info = JSON.parse(company_info)
            }

            const private_key = company_info.private_key;
            const data_check = crypto.md5_32_capitalized(private_key);
            console.log('data_check:', data_check);
            if (sign != data_check) {
                ctx.body = {
                    code: 13002,
                    message: "MD5签名错误",
                }
                return
            }
        } catch (error) {
            ctx.logger.error('mid=>signCheck:', error);
            ctx.body = {
                code: 500,
                message: 'Server error'
            }
            return
        }
        await next();
    };
};