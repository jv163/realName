/*
 * @Date: 2019-11-28 15:01:08
 * @LastEditors: JV
 * @LastEditTime: 2020-04-16 13:14:02
 */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'postgres',
    host: '125.77.26.136',
    username: 'postgres',
    password: 'pid5nd3u',
    port: 5432,
    database: 'realName',
  };
  
  return {
    ...config,
  };
};