#!/bin/bash
###
# @Date: 2020-01-17 11:16:40
 # @LastEditors: JV
 # @LastEditTime: 2020-04-10 16:09:29
###

param=$1
param2=$2

case $param in
restart)
    if [ $param2 = "prod" ]; then
        env=start
    elif [ $param2 = "test" ]; then
        env=test
    else
        echo " *** script info: Please enter normal environment *** "
        exit
    fi

    echo " *** script info: Prepare to restart service env=${env} *** "
    npm run stop
    wait
    npm run $env
    ;;
log)
    echo " *** script info: actual time log *** "
    tail -f logs/realName/realName-web.log
    ;;
*)
    echo " ***script info: Entering the correct param,Please!*** "
    ;;
esac
