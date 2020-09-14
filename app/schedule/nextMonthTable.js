/*
 * @Date: 2020-04-10 15:27:39
 * @LastEditors: JV
 * @LastEditTime: 2020-04-20 09:23:54
 */
const Subscription = require('egg').Subscription;

class RealName extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '10d', // 10天间隔
            type: 'all', // 指定所有的 worker 都需要执行
            immediate: true, //应用启动立刻执行一次
            disable: false, //定时任务开关,false为打开
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        try {
            this.ctx.service.dbTable.createMonthPartitionTable('next_month')
        } catch (error) {
            this.ctx.logger.error(error);
        }
    }
}

module.exports = RealName;