/*
 * @Date: 2019-12-02 10:58:02
 * @LastEditors: JV
 * @LastEditTime: 2020-04-17 17:03:03
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */
const Service = require('egg').Service;

class PushLogService extends Service {
    /**
     * 创建日志
     * @param docs 字段信息
     * @returns 创建结果
     */

    async createLog(docs) {
        try {
            return await this.ctx.model.PushLogs.create(docs, {
                returning: false
            });
        } catch (error) {
            throw {
                errorPosition: 'service:pushLog-createLog error',
                errorInfo: error,
            }
        }
    } 
}

module.exports = PushLogService;