/*
 * @Date: 2019-11-28 15:01:08
 * @LastEditors: JV
 * @LastEditTime: 2020-04-06 19:12:04
 */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'postgres',
    host: '10.15.154.31',
    username: 'postgres',
    password: 'Fz123456!',
    port: 5432,
    database: 'kddj',
  };

  return {
    ...config,
  };
};