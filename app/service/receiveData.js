/*
 * @Date: 2019-12-02 10:58:02
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 15:57:11
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */
const Service = require('egg').Service;

class ReceiveDataService extends Service {
    /**
     * 插入实名数据
     * @param docs 字段信息
     * @returns 创建结果
     */

    async createReceiveData(docs) {
        try {
            return await this.ctx.model.RealNames.create(docs);
        } catch (error) {
            throw {
                errorPosition: 'service:receiveData-createReceiveData error',
                errorInfo: error,
            }
        }
    }

    /**
     * 插入物流状态
     * @param docs 字段信息
     * @returns 创建结果
     */

    async createProcessInfos(docs) {
        try {
            return await this.ctx.model.ProcessInfos.create(docs);
        } catch (error) {
            throw {
                errorPosition: 'service:receiveData-createProcessInfos error',
                errorInfo: error,
            }
        }
    }
}

module.exports = ReceiveDataService;