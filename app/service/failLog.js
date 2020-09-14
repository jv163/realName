/*
 * @Date: 2019-12-02 10:58:02
 * @LastEditors: JV
 * @LastEditTime: 2020-04-28 15:30:50
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */
const Service = require('egg').Service;

class FailLogService extends Service {
    /**
     * 创建失败日志
     * @param docs 字段信息
     * @returns 创建结果
     */

    async createFailLog(docs) {
        try {
            return await this.ctx.model.FailLogs.create(docs, {
                returning: false
            });
        } catch (error) {
            throw {
                errorPosition: 'service:failLog-createFailLog error',
                errorInfo: error,
            }
        }
    }
}

module.exports = FailLogService;