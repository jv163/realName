/*
 * @Date: 2019-12-02 10:58:02
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 17:13:48
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */
const Service = require('egg').Service;

const admin_init = require('../dict/admin').init;

class UserService extends Service {
    /**
     * 初始化用户
     */
    async initUser() {
        try {
            const adminInfo = await this.ctx.model.Users.findAll({
                where: {
                    account: 'admin'
                }
            });
            if (adminInfo.length === 0) {
                await this.ctx.model.Users.create(admin_init)
                this.ctx.logger.info('-------初始化超级管理员账户---------');
                this.ctx.logger.info('-------account:admin--------------');
                this.ctx.logger.info('-------password:admin-------------');
            }
        } catch (error) {
            this.ctx.logger.error('service:user-initUser:', error);
        }
    }
    /**
     * 查询用户
     * @param where 字段信息
     * @returns 创建结果
     */


    async findUser(where) {
        try {
            const data = await this.ctx.model.Users.findAll(where);
            if (data.length > 0) {
                const reult = [];
                for (let itme of data) {
                    reult.push(itme.dataValues)
                }
                return reult
            } else {
                return []
            }
        } catch (error) {
            this.ctx.logger.error('service:user-findUser:', error);
        }
    }
}

module.exports = UserService;