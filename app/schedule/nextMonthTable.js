/*
 * @Date: 2020-04-10 15:27:39
 * @LastEditors: JV
 * @LastEditTime: 2020-12-10 15:56:43
 */
const Subscription = require('egg').Subscription;

class RealName extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '10d', // 10天间隔
            type: 'worker', // 指定所有的 worker 都需要执行
            immediate: true, //应用启动立刻执行一次
            disable: false, //定时任务开关,false为打开
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        try {
            const node = moment().add(1, 'months').format('YYYYMM'),
            format_node = moment().add(1, 'months').format('YYYY-MM-01'),
            next_format_node = moment().add(2, 'months').format('YYYY-MM-01');

            this.ctx.service.dbTable.createMonthPartitionTable(node, format_node, next_format_node)
        } catch (error) {
            this.ctx.logger.error(error);
        }
    }
}

module.exports = RealName;