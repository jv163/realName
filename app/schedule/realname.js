/*
 * @Date: 2020-04-10 15:27:39
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 16:02:50
 */
const Subscription = require('egg').Subscription;

class RealName extends Subscription {
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
            const realName_lenght = await this.ctx.app.redis.llen('realName');
            if (realName_lenght > 0) {
                let frequency = 10;
                for (let i = 1; i <= frequency; i++) {
                    const real_name_data = await this.ctx.app.redis.rpop('realName');
                    if(!real_name_data) break;
                    await this.ctx.service.receiveData.createReceiveData(JSON.parse(real_name_data));
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

module.exports = RealName;