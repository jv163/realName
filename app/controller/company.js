/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-08 14:34:40
 */
'use strict';

const Controller = require('egg').Controller;

const uuid = require('node-uuid');
const crypto = require('../utils/crypto');

class CompanyController extends Controller {

  async create() {
    try {
      const {
        ctx
      } = this;
      if (
        !ctx.request.body.company_name
      ) {
        ctx.body = {
          code: 10000,
          message: "参数不完整或者格式错误"
        };
        return
      }
      const company_name = ctx.request.body.company_name;
      const isexist = await ctx.service.company.findCompany({
        where: {
          company_name
        }
      })

      if (isexist.length > 0) {
        ctx.body = {
          code: 12001,
          message: "企业名称已存在！"
        };
        return
      }

      const secret_id = uuid.v4().replace(/-/g, '');
      const  {
        public_key,
        private_key
    } = crypto.create_rsa_key();
      await ctx.service.company.createCompany({
        company_name,
        public_key,
        private_key,
        secret_id,
      });

      ctx.body = {
        code: 200,
        data: {
          company_name,
          secret_id,
          public_key,
        },
        message: '企业创建成功'
      }
      return
    } catch (error) {
      this.ctx.logger.error(error);
      this.ctx.body = {
        success: false,
        code: 500,
        message: '系统错误',
      }
    }
  }
}


module.exports = CompanyController;