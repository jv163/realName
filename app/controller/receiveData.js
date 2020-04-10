/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 17:55:36
 */
'use strict';

const Controller = require('egg').Controller;

const processInfos_status = require('../dict/status').processInfos;

class ReceiveDataController extends Controller {

  async realName() {
    try {
      const {
        ctx
      } = this;

      const data = ctx.request.body.data;
      if (
        !data.delivery_no ||
        !data.province ||
        !data.city ||
        !data.s_address ||
        !data.s_name ||
        !data.s_phone ||
        !data.s_sid ||
        !data.s_sex ||
        !data.s_nationality ||
        !data.r_address ||
        !data.r_name ||
        !data.r_phone ||
        !data.p_name ||
        !data.p_sid ||
        !data.p_phone ||
        !data.create_time ||
        !data.description ||
        !data.company ||
        !data.branch ||
        !data.brand ||
        !data.type ||
        !(data.type === 'S' || data.type === 'R') ||
        !data.order_id ||
        !data.s_regarea ||
        !data.r_regarea ||
        !data.access_branch ||
        !data.access_time ||
        !data.access_postman ||
        !data.access_phone ||
        !data.access_sid ||
        !data.weight ||
        !data.pay ||
        !data.pay_type
      ) {
        ctx.body = {
          code: 10000,
          message: "参数不完整或者格式错误"
        };
        return
      }

      await ctx.app.redis.lpush('realName', JSON.stringify(data))

      ctx.body = {
        code: 200,
        message: '推送成功'
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
  async processInfo() {
    try {
      const {
        ctx
      } = this;
      const data = ctx.request.body.data;
      if (
        !data.delivery_no ||
        !data.create_time ||
        !data.process_status ||
        !data.process_info ||
        !data.province ||
        !data.city ||
        !data.district ||
        !data.province_source ||
        !data.city_source ||
        !data.district_source ||
        !data.province_target ||
        !data.city_target ||
        !data.district_target ||
        !data.district_address) {
        ctx.body = {
          code: 10000,
          message: "参数不完整或者格式错误"
        };
        return
      }

      if (!processInfos_status.includes(data.process_status)) {
        ctx.body = {
          code: 10000,
          message: "参数不完整或者格式错误"
        };
        return
      }

      await ctx.app.redis.lpush('processInfo', JSON.stringify(data))
      ctx.body = {
        code: 200,
        message: '创建成功'
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


module.exports = ReceiveDataController;