/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 17:07:35
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    try {
      const {
        ctx
      } = this;
      if (
        !ctx.request.body.account ||
        !ctx.request.body.password
      ) {
        ctx.body = {
          code: 10000,
          message: "参数不完整或者格式错误"
        };
        return
      }

      const {
        account,
        password
      } = ctx.request.body;

      const user_info = await ctx.service.user.findUser({
        where: {
          account
        }
      })

      if (user_info.length <= 0) {
        ctx.body = {
          code: 11001,
          message: "用户不存在！"
        };
        return
      }

      if (password === user_info[0].password) {
        ctx.session.user = user_info[0];
        ctx.body = {
          code: 200,
          message: "登录成功"
        }
        return
      } else {
        ctx.body = {
          code: 11002,
          message: "密码错误！"
        };
        return
      }
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


module.exports = UserController;