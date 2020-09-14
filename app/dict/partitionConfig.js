/*
 * @Date: 2019-11-29 10:48:57
 * @LastEditors: JV
 * @LastEditTime: 2020-08-20 15:57:59
 */
const moment = require('moment');

module.exports = {
    day: {
        node: moment().format('YYYYMMDD'),
        format_node: moment().format('YYYY-MM-DD'),
        next_format_node: moment().add(1, 'days').format('YYYY-MM-DD'),
    },
    next_day: {
        node: moment().add(1, 'days').format('YYYYMMDD'),
        format_node: moment().add(1, 'days').format('YYYY-MM-DD'),
        next_format_node: moment().add(2, 'days').format('YYYY-MM-DD'),
    },
    month: {
        node: moment().format('YYYYMM'),
        format_node: moment().format('YYYY-MM-01'),
        next_format_node: moment().add(1, 'months').format('YYYY-MM-01'),
    },
    next_month: {
        node: moment().add(1, 'months').format('YYYYMM'),
        format_node: moment().add(1, 'months').format('YYYY-MM-01'),
        next_format_node: moment().add(2, 'months').format('YYYY-MM-01'),
    },
}