/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 15:18:44
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  //sequelize config
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  //redis config
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};