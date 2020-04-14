/*
 * @Date: 2020-04-07 10:11:49
 * @LastEditors: JV
 * @LastEditTime: 2020-04-14 11:16:55
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

  router.post('/receiveData/realName', signCheck, controller.receiveData.realName);
  router.post('/receiveData/processInfo', signCheck, controller.receiveData.processInfo);
};