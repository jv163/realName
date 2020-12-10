/*
 * @Date: 2019-12-02 10:58:02
 * @LastEditors: JV
 * @LastEditTime: 2020-12-10 17:17:45
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */
const Service = require('egg').Service;
const create_table = require('../dict/createTable');
const month_table = require('../dict/monthTable');

class DbTableService extends Service {
    /**
     * 初始化数据库表
     * @param docs 字段信息
     * @returns 创建结果
     */

    async initTable() {
        try {
            const table_names = create_table.name;
            for (let table_name of table_names) {
                const isexist = await this.app.model.query(`select count(*) from pg_class where relname = '${table_name}';`, {
                    type: 'SELECT'
                })
                if (isexist[0].count === '0') {
                    await this.app.model.query(create_table[table_name], {
                        type: 'SELECT'
                    })
                }
            }
        } catch (error) {
            throw {
                errorPosition: 'service:dbTable-initTable error',
                errorInfo: error,
            }
        }
    }

    /**
     * 创建月分区表
     * @param docs 字段信息
     * @returns 创建结果
     */

    async createMonthPartitionTable(node, format_node, next_format_node) {
        try {
            const table_names = month_table.table_names;
            for (let table_name of table_names) {
                this.app.model.query(`select count(*) from pg_class where relname = '${table_name}_${node}';`, {
                        type: 'SELECT'
                    })
                    .then(projects => {
                        if (projects[0].count === '0') {
                            this.app.model.query(month_table[table_name](node, format_node, next_format_node), {
                                type: 'SELECT'
                            })
                        }
                    });
            }
        } catch (error) {
            throw {
                errorPosition: 'service:dbTable-createMonthPartitionTable error',
                errorInfo: error,
            }
        }
    }

}

module.exports = DbTableService;