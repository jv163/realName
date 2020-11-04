/*
 * @Date: 2019-12-02 10:58:02
 * @LastEditors: JV
 * @LastEditTime: 2020-09-15 11:01:55
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
            return await this.ctx.model.RealNames.create(docs, {
                returning: false
            });
        } catch (error) {
            throw {
                errorPosition: 'service:receiveData-createReceiveData error',
                errorInfo: error,
            }
        }
    }

    /**
     * 更新实名数据
     * @param docs 更新字段信息
     * @param where 更新条件
     * @returns 创建结果
     */

    async updateReceiveData(docs, where) {
        try {
            return await this.ctx.model.RealNames.update(docs, where);
        } catch (error) {
            throw {
                errorPosition: 'service:receiveData-updateReceiveData error',
                errorInfo: error,
            }
        }
    }

    /**
     * 查询实名数据
     * @param where 查询条件
     * @returns 创建结果
     */

    async findReceiveData(where) {
        try {
            const data = await this.ctx.model.RealNames.findAll(where);
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
            throw {
                errorPosition: 'service:receiveData-findReceiveData error',
                errorInfo: error,
            }
        }
    }


    /**
     * 查询实名数据
     * @param where 查询条件
     * @returns 创建结果
     */

    async findReceiveCount(where) {
        try {
            return await this.ctx.model.RealNames.count(where);
        } catch (error) {
            throw {
                errorPosition: 'service:receiveData-findReceiveData error',
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
            return await this.ctx.model.ProcessInfos.create(docs, {
                returning: false
            });
        } catch (error) {
            throw {
                errorPosition: 'service:receiveData-createProcessInfos error',
                errorInfo: error,
            }
        }
    }
}

module.exports = ReceiveDataService;