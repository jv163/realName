/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 16:58:26
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  const signCheck = app.middleware.signCheck();

  router.post('/user/login', controller.user.login);

  router.post('/company/create', controller.company.create);

  router.post('/data/realName', signCheck, controller.receiveData.realName);
  router.post('/data/processInfo', signCheck, controller.receiveData.processInfo);
};