/*
 * @Date: 2020-04-10 15:27:39
 * @LastEditors: JV
 * @LastEditTime: 2020-12-11 11:37:22
 */
const Subscription = require('egg').Subscription;

const moment = require('moment');

class TruncateTable extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            cron: '0 0 0 15 * ?', // 每月15号
            type: 'worker', // 指定所有的 worker 都需要执行
            immediate: true, //应用启动立刻执行一次
            disable: false, //定时任务开关,false为打开
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        try {
            const node = moment().format('YYYYMM');
            this.ctx.service.dbTable.truncateTable(node);
        } catch (error) {
            this.ctx.logger.error(error);
        }
    }
}

module.exports = TruncateTable;