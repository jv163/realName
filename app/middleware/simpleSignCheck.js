/*
 * @Date: 2019-11-28 17:17:00
 * @LastEditors: JV
 * @LastEditTime: 2020-09-15 10:47:43
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */

//签名校验
'use strict';

const crypto = require('../utils/crypto');

module.exports = options => {
    return async function signCheck(ctx, next) {
        try {
            //参数校验
            if (!ctx.request.body.company_name ||
                !ctx.request.body.sign
            ) {
                ctx.body = {
                    code: 10000,
                    message: "参数不完整或者格式错误",
                }
                return
            }
            const {
                company_name,
                sign
            } = ctx.request.body;



            const company_infos = await ctx.service.company.findCompany({
                where: {
                    company_name,
                }
            })

            if (company_infos.length <= 0) {
                ctx.body = {
                    code: 13001,
                    message: "没有限权",
                }
                return
            }


            const secret_id = company_infos[0].secret_id;
            const data_check = crypto.md5_32_capitalized(secret_id);
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