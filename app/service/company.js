/*
 * @Date: 2019-12-02 10:58:02
 * @LastEditors: JV
 * @LastEditTime: 2020-04-08 15:09:29
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */
const Service = require('egg').Service;

class CompanyService extends Service {
    /**
     * 创建企业
     * @param docs 字段信息
     * @returns 创建结果
     */

    async createCompany(docs) {
        try {
            return await this.ctx.model.Companys.create(docs);
        } catch (error) {
            throw {
                errorPosition: 'service:company-createCompany error',
                errorInfo: error,
            }
        }
    }

    /**
     * 查询企业
     * @param where 查询条件
     * @returns 查询结果
     */
    async findCompany(where) {
        try {
            const data = await this.ctx.model.Companys.findAll(where);
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
            this.ctx.logger.error('service:company-findCompany:', error);
        }
    }
}

module.exports = CompanyService;