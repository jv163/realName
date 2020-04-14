const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

//config
const num = 5;
let s_real_num = 0,
    s_process_num = 0;
const company_key = {
    "company_name": "百世快递",
    "secret_id": "f57bdad0cc264f8aa85b4d780486cd6d",
    "public_key": "-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAINNVCADPQcvbXAqcNvi1YtcUlX6WPUq\nPCMPNp9Q9WkxkC9vvR9LPIcnCgT1/73nqqUkujD4qUKXaCemsqclNBMCAwEAAQ==\n-----END PUBLIC KEY-----"
}
// const env = 'http://125.77.26.133:55362';
const env = 'http://127.0.0.1:7001';

console.log('start:', moment().format('YYYY-MM-DD HH:mm:ss'));
console.log('req_times:', num);

async function main() {
    //推送实名数据
    const ream_name_body = {
        'delivery_no': '123',
        'province': '123',
        'city': '123',
        's_address': '123',
        's_name': '123',
        's_phone': '123',
        's_sid': '123',
        's_sex': '123',
        's_nationality': '123',
        'r_address': '123',
        'r_name': '123',
        'r_phone': '123',
        'r_sid': '123',
        'r_sex': '123',
        'p_name': '123',
        'p_sid': '123',
        'p_phone': '123',
        'create_time': '2020-04-05 14:20:20',
        'description': '123',
        'company': '123',
        'branch': '123',
        'brand': '123',
        'type': 'S',
        'String': 'S',
        'sign': '123',
        'order_id': '123',
        's_regarea': '123',
        'r_regarea': '123',
        'access_branch': '123',
        'access_time': '123',
        'access_postman': '123',
        'access_phone': '123',
        'String': '123',
        'access_sid': '123',
        'String': '123',
        'weight': '123',
        'pay': '123',
        'pay_type': '123',
    }
    const data_order = crypto_obj(ream_name_body);
    const crypto_string = rsa_encrypt(data_order, company_key.public_key)
    // console.log('crypto_string', crypto_string)

    const md5_str = crypto_string + company_key.public_key;
    const sign = md5_32_capitalized(md5_str);
    axios.post(`${env}/receiveData/realName`, {
            data: crypto_string,
            secret_id: company_key.secret_id,
            sign,
        })
        .then(function (response) {
            if (response.data.code === 200) {
                s_real_num++;
                console.log('s_real_num:', s_real_num)
            } else {
                console.log('result:', response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    //物流信息推送
    const process_info_body = {
        'delivery_no': '123',
        'create_time': '2020-04-05 14:20:20',
        'process_status': '发货中',
        'process_info': '123',
        'province': '123',
        'String': '123',
        'city': '123',
        'String': '123',
        'district': '123',
        'String': '123',
        'province_source': '123',
        'city_source': '123',
        'district_source': '123',
        'province_target': '123',
        'city_target': '123',
        'district_target': '123',
        'district_address': '123',
    }

    const process_info_data_order = crypto_obj(process_info_body);
    const process_info_crypto_string = rsa_encrypt(process_info_data_order, company_key.public_key);
    // console.log('process_info_crypto_string', process_info_crypto_string)

    const process_info_md5_str = process_info_crypto_string + company_key.public_key;
    const process_info_sign = md5_32_capitalized(process_info_md5_str);

    axios.post(`${env}/receiveData/processInfo`, {
            data: process_info_crypto_string,
            secret_id: company_key.secret_id,
            sign: process_info_sign,
        })
        .then(function (response) {
            if (response.data.code === 200) {
                s_process_num++;
                console.log('s_process_num', s_process_num)
            } else {
                console.log('result:', response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

//对象排序加密
function crypto_obj(data) {
    let signBuilder = '',
        i = 0;
    if (typeof (data) != 'object') return '数据类型错误'
    Object.keys(data).sort().forEach(function (aKey) {
        let value = '';
        if (data[aKey]) {
            value = data[aKey];
        }
        if (i > 0) {
            signBuilder += ('&' + aKey + '=' + value)
        } else {
            signBuilder += (aKey + '=' + value)
        }
        i++;
    });
    return signBuilder
}

function rsa_encrypt(data, public_key) {
    const nodersa = new NodeRSA(public_key);
    // nodersa.setOptions({ encryptionScheme: 'pkcs1' });
    const encrypted = nodersa.encrypt(data, 'base64');
    return encrypted;
}

function md5_32_capitalized(data) {
    return crypto.createHash('md5').update(data).digest("hex").toUpperCase();
}

for (let i = 1; i <= num; i++) {
    main();
}