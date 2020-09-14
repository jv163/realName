/*
 * @Date: 2020-04-10 15:27:39
 * @LastEditors: JV
 * @LastEditTime: 2020-05-29 15:36:07
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
                    if (!real_name_data) break;
                    var docs = JSON.parse(real_name_data);

                    // //检查时间格式
                    if (!docs.create_time) docs.create_time = undefined;
                    if (!docs.timestamp) docs.timestamp = undefined;
                    if (!docs.access_time) docs.access_time = undefined;

                    // const delivery_no = docs.delivery_no;
                    // //校验是否短时间重复推送
                    // const isrepeat = await this.ctx.app.redis.get(`repeat_realName_${delivery_no}`);
                    // if (isrepeat) {
                    //     const old_real_name_info = await this.ctx.service.receiveData.findReceiveData({
                    //         where: {
                    //             delivery_no,
                    //         },
                    //         order: [
                    //             ['created_at', 'DESC']
                    //         ],
                    //         limit: 1
                    //     })
                    //     if (old_real_name_info.length > 0) {
                    //         await this.ctx.service.receiveData.updateReceiveData(docs, {
                    //             where: {
                    //                 id: old_real_name_info[0].id,
                    //             },
                    //         })
                    //     } else {
                    //         await this.ctx.service.receiveData.createReceiveData(docs);
                    //         await this.ctx.app.redis.set(`repeat_realName_${delivery_no}`, docs);
                    //         await this.ctx.app.redis.expire(`repeat_realName_${delivery_no}`, 3600 * 24 * 14); //14天缓存 
                    //     }

                    // } else {
                    //     await this.ctx.service.receiveData.createReceiveData(docs);
                    //     await this.ctx.app.redis.set(`repeat_realName_${delivery_no}`, docs);
                    //     await this.ctx.app.redis.expire(`repeat_realName_${delivery_no}`, 3600 * 24 * 14); //14天缓存
                    // }

                    await this.ctx.service.receiveData.createReceiveData(docs);
                    //往内网推送
                    await this.ctx.app.redis.lpush('realNamePush', real_name_data);
                }
            }
        } catch (error) {
            this.ctx.logger.error(error);
            try {
                await this.ctx.service.failLog.createFailLog({
                    company_name: docs.company_name,
                    delivery_no: docs.delivery_no,
                    data_type: 'realname',
                    error_info: JSON.stringify(error),
                })
            } catch (error) {
                this.ctx.logger.error(error);
            }
        }
    }
}

module.exports = RealName;