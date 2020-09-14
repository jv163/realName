/*
 * @Date: 2019-11-28 15:01:08
 * @LastEditors: JV
 * @LastEditTime: 2020-05-22 17:26:19
 */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};

  //postgresql config
  config.sequelize = {
    dialect: 'postgres',
    host: '192.168.128.203',
    username: 'postgres',
    password: 'wJh5COzkA',
    port: 5432,
    database: 'realname',
  };

  //redis config
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '192.168.128.202', // Redis host
      password: 'EMU5fHlAa',
      db: 0,
    },
  }

  return {
    ...config,
  };
};
