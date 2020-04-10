/*
 * @Date: 2019-11-28 17:17:00
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 17:56:44
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */

//签名校验
'use strict';

const crypto = require('../utils/crypto');

module.exports = options => {
    return async function signCheck(ctx, next) {
        try {
            //添加返回信息
            let sign_check = true;

            //----测试
            // const crypto_obj = crypto.crypto_obj(ctx.request.body.data);
            // const crypto_string = crypto.rsa_encrypt(crypto_obj, '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJqOkhwyABSyiEuPMfZBtZbOBo3bnk+2B4P9HnNyY1VD1ZWZHuf3q7xMOOK88OJntYghnBOQgEqPfLqD8JlbG1UCAwEAAQ==-----END PUBLIC KEY-----');
            // console.log('crypto_string', crypto_string)

            //参数校验
            if (!ctx.request.body.secret_id ||
                !ctx.request.body.sign ||
                !ctx.request.body.data ||
                typeof (ctx.request.body.data) != 'string'
            ) {
                ctx.body = {
                    code: 10000,
                    message: "参数不完整或者格式错误",
                }
                return
            }
            const {
                secret_id,
                sign,
                data
            } = ctx.request.body;
            const company_info = await ctx.service.company.findCompany({
                where: {
                    secret_id,
                }
            })
            const data_check_str = data + company_info[0].public_key;
            const data_check = crypto.md5_32_capitalized(data_check_str);
            //----测试
            // console.log('data_check', data_check);
            if (sign != data_check) {
                ctx.body = {
                    code: 13001,
                    message: "签名错误",
                }
                return
            }
            //数据转化
            const data_str = crypto.rsa_decrypt(data, company_info[0].private_key);
            const data_arr = data_str.split('&');
            const data_obj = {};
            for (let i of data_arr) {
                const attribute = i.split('=');
                data_obj[attribute[0]] = attribute[1];
            }
            ctx.request.body.data = data_obj;
            //----测试
            // console.log('data_obj', data_obj)
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