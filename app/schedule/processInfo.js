/*
 * @Date: 2020-04-10 15:27:39
 * @LastEditors: JV
 * @LastEditTime: 2020-12-11 10:17:04
 */
const Subscription = require('egg').Subscription;

class ProcessInfo extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '1s', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
            disable: false, //定时任务开关,false为打开
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        try {
            const processInfo_lenght = await this.ctx.app.redis.llen('processInfo');
            if (processInfo_lenght > 0) {
                let frequency = 10;
                for (let i = 1; i <= frequency; i++) {
                    const processInfo_data = await this.ctx.app.redis.rpop('processInfo');
                    if (!processInfo_data) break;
                    var docs = JSON.parse(processInfo_data);
                    //检查时间格式
                    if (!docs.create_time) docs.create_time = undefined;
                    await this.ctx.service.receiveData.createProcessInfos(docs);
                    // await this.ctx.app.redis.lpush('processInfoPush', processInfo_data);
                }
            }
        } catch (error) {
            this.ctx.logger.error(error);
            try {
                await this.ctx.service.failLog.createFailLog({
                    company_name: docs.company_name,
                    delivery_no: docs.delivery_no,
                    data_type: 'processInfo',
                    error_info: JSON.stringify(error),
                })
            } catch (error) {
                this.ctx.logger.error(error);
            }
        }
    }
}

module.exports = ProcessInfo;