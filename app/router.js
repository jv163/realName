/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-22 17:26:20
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
  const pushLog = app.middleware.pushLog();
  const simpleSignCheck = app.middleware.simpleSignCheck();

  router.post('/user/login', controller.user.login);

  router.post('/company/create', controller.company.create);
  router.post('/company/find', controller.company.find);

  router.post('/receiveData/realName', pushLog, signCheck, controller.receiveData.realName);
  router.post('/receiveData/processInfo', pushLog, signCheck, controller.receiveData.processInfo);
  router.post('/receiveData/findRealName', pushLog, simpleSignCheck, controller.receiveData.findRealName);
};