<!--
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 16:08:32
 -->
# realName

服务启动：
    测试环境：npm run test
    生产环境：npm run start

服务停止：
    测试环境：npm run stop

查看服务(linux)：
    ps -eo "pid,command" | grep -- "--title=egg-server-realName"

linux脚本：
    查看实时日志 sh script.sh log
    重启服务 sh script.sh restart test/prod