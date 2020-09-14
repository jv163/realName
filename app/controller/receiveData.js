/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-05-29 15:39:48
 */
'use strict';

const Controller = require('egg').Controller;

const processInfos_status = require('../dict/status').processInfos;
const moment = require('moment');

class ReceiveDataController extends Controller {

  async realName() {
    try {
      const {
        ctx
      } = this;

      const data = ctx.request.body.data_obj;

      // if (
      //   !data.delivery_no ||
      //   !data.province ||
      //   !data.city ||
      //   !data.s_address ||
      //   !data.s_name ||
      //   !data.s_phone ||
      //   !data.s_sid ||
      //   !data.s_sex ||
      //   !data.s_nationality ||
      //   !data.r_address ||
      //   !data.r_name ||
      //   !data.r_phone ||
      //   !data.p_name ||
      //   !data.p_sid ||
      //   !data.p_phone ||
      //   !data.create_time ||
      //   !data.description ||
      //   !data.company ||
      //   !data.branch ||
      //   !data.brand ||
      //   !data.type ||
      //   !(data.type === 'S' || data.type === 'R') ||
      //   !data.order_id ||
      //   !data.s_regarea ||
      //   !data.r_regarea ||
      //   !data.access_branch ||
      //   !data.access_time ||
      //   !data.access_postman ||
      //   !data.access_phone ||
      //   !data.access_sid ||
      //   !data.weight ||
      //   !data.pay ||
      //   !data.pay_type
      // ) {
      //   ctx.body = {
      //     code: 10000,
      //     message: "参数不完整或者格式错误"
      //   };
      //   return
      // }

      await ctx.app.redis.lpush('realName', JSON.stringify(data));
      // await ctx.app.redis.lpush('realNamePush', JSON.stringify(data));

      ctx.body = {
        code: 200,
        message: '进/出港数据推送成功'
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
      const data = ctx.request.body.data_obj;
      // if (
      //   !data.delivery_no ||
      //   !data.create_time ||
      //   !data.process_status ||
      //   !data.process_info ||
      //   !data.province ||
      //   !data.city ||
      //   !data.district ||
      //   !data.province_source ||
      //   !data.city_source ||
      //   !data.district_source ||
      //   !data.province_target ||
      //   !data.city_target ||
      //   !data.district_target ||
      //   !data.district_address) {
      //   ctx.body = {
      //     code: 10000,
      //     message: "参数不完整或者格式错误"
      //   };
      //   return
      // }

      // if (!processInfos_status.includes(data.process_status)) {
      //   ctx.body = {
      //     code: 10000,
      //     message: "参数不完整或者格式错误"
      //   };
      //   return
      // }

      await ctx.app.redis.lpush('processInfo', JSON.stringify(data));
      // await ctx.app.redis.lpush('processInfoPush', JSON.stringify(data));

      ctx.body = {
        code: 200,
        message: '进/出港快件物流状态数据推送成功'
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

  async findRealName() {
    try {
      const {
        ctx
      } = this;

      const search = ctx.request.body.search || ''
      const limit = ctx.request.body.limit || 20;
      const page = ctx.request.body.page || 1;

      const Op = this.app.Sequelize.Op;
      const data = await ctx.service.receiveData.findReceiveData({
        where: {
          [Op.or]: [{
            delivery_no: search,
          }, {
            s_sid: search,
          }, {
            s_phone: search,
          }, {
            r_phone: search,
          }],
        },
        order: [
          ['create_time', 'ASC']
        ],
        limit,
        offset: limit * (page - 1),
      }, )

      for (let i of data) {
        delete i.createdAt;
        delete i.updatedAt;
        i.create_time = moment(i.create_time).format('YYYY-MM-DD HH:mm:ss');
        if (i.type === 'S') {
          i.type = '寄件';
        } else {
          i.type = '收件';
        }
      }

      ctx.body = {
        success: true,
        code: 200,
        data,
        message: '查询成功'
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