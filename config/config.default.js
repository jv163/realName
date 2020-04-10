/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 16:57:32
 */
/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const defpath = path.join(__dirname, '../');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586225272656_7651';

  // add your middleware config here
  config.middleware = ['checkLogin'];

  config.sequelize = {
    dialect: 'postgres',
    host: '125.77.26.136',
    username: 'postgres',
    password: 'pid5nd3u',
    port: 5432,
    database: 'realName',
  };

  //redis config
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  }

  //日志路径
  config.logger = {
    dir: `${defpath}logs/realName`,
  };

  //关闭csrf验证
  config.security = {
    csrf: {
      enable: false
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};