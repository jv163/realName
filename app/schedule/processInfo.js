/*
 * @Date: 2020-04-10 15:27:39
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 16:46:01
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
                    console.log('111', processInfo_data)
                    await this.ctx.service.receiveData.createProcessInfos(JSON.parse(processInfo_data));
                }
            }
        } catch (error) {
            this.ctx.logger.error(error);
            this.ctx.body = {
                success: false,
                code: 500,
                message: '系统错误',
            }
        }
    }
}

module.exports = ProcessInfo;