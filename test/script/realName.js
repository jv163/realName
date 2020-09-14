const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

//config
const num = 1;
const req = true;
const decrypt = false;
let s_real_num = 0,
    s_process_num = 0;

const company_key = {
    "company_name": "测试账号",
    "secret_id": "4cdcb995700145b382cdd62efd8c3c9e",
    "public_key": `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIsEEB2wQcsSiMjZDUbRhFarURr6C3z1
WX4VS0mHUqAzS5CnnbRUHCeUKVgahJqLmyjJzo4eS7vUELSEMF/xjxkCAwEAAQ==
-----END PUBLIC KEY-----`,
    "key": `-----BEGIN PUBLIC KEY-----
    MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKAjIWbAkenmznVdEi7ZhjpKG2oCjtgn
    ZSJRXvy2UVZ436paUiWR3c0LhrPOHZe3z/1Xd0vwvdUsLa5CQ1rYZMMCAwEAAQ==
    -----END PUBLIC KEY-----`
}


// 正式
// const company_key = {
//     "company_name": "测试账号",
//     "secret_id": "1eb8679ddadf48129fa0d28a421828db",
//     "public_key": `-----BEGIN PUBLIC KEY-----
// MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKsSuoFN7YxPLRhjnIa/gzC4qEv3FRzZ
// x+F4BsjBJumNIbPnUYwFCuVGbyHQbnVWR5PI569kxXhFUPLI3lGALKMCAwEAAQ==
// -----END PUBLIC KEY-----`,
//     "key": `-----BEGIN PUBLIC KEY-----
//     MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKAjIWbAkenmznVdEi7ZhjpKG2oCjtgn
//     ZSJRXvy2UVZ436paUiWR3c0LhrPOHZe3z/1Xd0vwvdUsLa5CQ1rYZMMCAwEAAQ==
//     -----END PUBLIC KEY-----`
// }

// const env = 'http://125.77.26.133:55362';
const env = 'http://127.0.0.1:7001';
// const env = 'http://112.49.123.19:9001';


console.log('start:', moment().format('YYYY-MM-DD HH:mm:ss'));
console.log('req_times:', num);

async function main() {
    //推送实名数据
    const ream_name_body = {
        "delivery_no": "CS123456789",
        "province": "测试省789",
        "city": "测试市",
        "s_address": "测试省测试市测试栋1-201",
        "s_name": "寄件人",
        "s_phone": "158****6512",
        "s_sid": "123456789123456789",
        "s_sex": "男",
        "s_nationality": "汉",
        "r_address": "测试省测试市测试栋2-201",
        "r_name": "测试名",
        "r_phone": "134****2132",
        "r_sid": "",
        "r_sex": "",
        "p_name": "快递员",
        "p_sid": "123456789123456789",
        "p_phone": "12345678910",
        "create_time": "123123123",
        "description": "包裹",
        "company": "测试速递",
        "branch": "测试省测试市测试栋3-201",
        "brand": "测试速递",
        "type": "R",
        "timestamp": "2020-04-16 12:33:30",
        "order_id": "3cc15668b9bfd505197880c421d1b35a",
        "s_regarea": "测试市",
        "r_regarea": "测试市县",
        "access_branch": "测试网点",
        "access_time": "2020-04-13 14:35:18",
        "access_postman": "派件员",
        "access_phone": "12345678910",
        "access_sid": "123456789123456789",
        "weight": "0.16",
        "pay": "10",
        "pay_type": "微信"
    }

    // const ream_name_body = {"branch":"上海南翔公司","brand":"申通快递","city":"上海市","company":"申通快递有限公司","create_time":"2020-05-13 00:01:48","delivery_no":"773036153619577","description":"ZP-电子教程","order_id":"996633249832434358","province":"上海","r_address":"潭城镇 西航路西和园三号楼1单元401","r_name":"薛**","r_phone":"182****8306","r_regarea":"平潭县","s_address":"上海市嘉定区南翔镇嘉好路420号东二楼仓库","s_name":"艺然办公专营店","s_phone":"15800667928","s_regarea":"嘉定区","timestamp":"2020-05-13 00:01:48","type":"R","weight":"0"}

    // console.log(company_key);
    // console.log(ream_name_body);
    const data_str = JSON.stringify(ream_name_body);
    console.log('data_str:', data_str)
    const crypto_string = rsa_encrypt(data_str, company_key.public_key)

    // const crypto_string = 'i+7ve6baRaD2U+XV+FUGdyX0Lxs5I/L0qegl8Rxcjg7/7+9R+fU6BzGFC0Q3Fhk5bUEI7mbYXAWU4J9V8yiQZzliVUgMf2psCrM7ooA8vRNUQilT8aQe9vpQHcIM00J1DxAkBgprpCxtboHmJ2zaFi8n0h4Fjbg3aMKEr67RRLJOOmAZw+I7ubQ+fiacrPuRIJjFE+8Y3ry5Yh86p7Mkjsf0DN4HME9zDOu1TY00HUexIBGOXy/0pDBQkAZ0+Xxkjx9TMGRLR0RFjMoPaQKaDZhXMOpqvlgHIgE+yfxpI74teTXExdfg4FtgAebpzthK7q/rm/+HCKhVZfrqXYmnYz86nNswGlFwr0DmDeMMhXKcFaUf07T6LkU3SS+lY/8a5D0ntnEvRC86yUTK2acU5td0/gudFeUJCCelqQ848NJ5iOT1qcE+Kmof1yiLGRn2HTlHVYn1jZtyT1JXcVfmnr5+T7SzksK4YX+B+mbl0uTizrQnYgyGRdP/WaM2/uvWYm1AkehaLi9Ax8os7TD8yvItlEU0jfqrAwzSb/dneESvby7DSmGk9EHw9jRTWn4ZLb2heCo5onpwVKsnqVlvbR7vRBBLddq9GrBWHNhvP/5b028/LS5UvZRt2Qnq8N8eHOa6WfvIJi/jvy30jJkJuVtCVA9gmtNEnGJ3nLa7lARfYJPv6TeRa88jOVl0UfFkQczIsSjpEXTBgBeuqoMU0nekgv5jbg7Ch7w5ylvd5ipLDLRlWDanqFexRt7rqbO1DM66L1pnZ8+mRGJOfqEX0sf9kVx9mUgLnhi/XOIwG/rFcBmeDeYH48DivpLQbDY5bmW2rJug5lgdEtiDHl7Fn0InT9X0Npnrl6gA0tuqCckVOovrwlU4dDgM/YTgtvMpM7sN6wwS/wGs/a+rYogpnZl3/4k98xS0/6TYgt4EoXdbetY/t1II5X3aUNXGEi2M4yCWlTdkqfEGoy5KUXx8dUrW9l/TDkP5WjbGhqv943mWg37Jvk1rCZsdaZ50GPMhRH+eFE4NR3EygSRnD3rujdDR9AFkbiD/Q88U4ZlzzpNnW+NbMOlPPx5/QTOFH4kjLvYCZjiaqxdrtHbXF2SIT0baybsRBTtI8UaeFacrznDrs1uSABs0d+wH1f3pyjb5wSPgWgk4MA76rcemrBoiciLPVgUOiuteEUGQCmiEIQI='
    if (decrypt) {
        const aa = rsa_decrypt(crypto_string, company_key.key);
        console.log('解密结果', aa)
    }
    console.log('crypto_string:', crypto_string)

    const md5_str = crypto_string + company_key.public_key;
    console.log('md5_str:', md5_str)
    const sign = md5_32_capitalized(md5_str);
    console.log('sign:', sign)
    const real_name_req_body = {
        data: crypto_string,
        secret_id: company_key.secret_id,
        sign,
    }
    //demo
    // console.log(company_key);
    // console.log(ream_name_body);
    // console.log(real_name_req_body);
    console.log(`${env}/receiveData/realName`)
    axios.post(`${env}/receiveData/realName`, real_name_req_body)
        .then(function (response) {
            console.log('result:', response.data)
            console.log('time:', moment().format('YYYY-MM-DD HH:mm:ss'))
            if (response.data.code === 200) {
                s_real_num++;
                console.log('s_real_num:', s_real_num)
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    // 物流信息推送
    // const process_info_body = {
    //     "city": "测试市",
    //     "city_source": "测试市",
    //     "city_target": "测试市",
    //     "create_time": "2020-04-16 12:33:30",
    //     "delivery_no": "CS123456789",
    //     "district": "测试市地址",
    //     "district_target": "测试市地址",
    //     "process_info": "快件派送中",
    //     "process_status": "运输中",
    //     "province": "测试市",
    //     "province_source": "测试市",
    //     "province_target": "测试市"
    // }

    // const process_info_data_str = JSON.stringify(process_info_body);
    // // console.log('process_info_data_str', process_info_data_str)
    // const process_info_crypto_string = rsa_encrypt(process_info_data_str, company_key.public_key)
    // // console.log('process_info_crypto_string:', process_info_crypto_string)
    // // console.log(process_info_crypto_string)
    // const process_info_md5_str = process_info_crypto_string + company_key.public_key;
    // // console.log('process_info_md5_str:', process_info_md5_str)
    // const process_info_sign = md5_32_capitalized(process_info_md5_str);
    // // console.log('process_info_sign:', process_info_sign)

    // axios.post(`${env}/receiveData/processInfo`, {
    //         data: process_info_crypto_string,
    //         secret_id: company_key.secret_id,
    //         sign: process_info_sign,
    //     })
    //     .then(function (response) {
    //         console.log('result:', response.data)
    //         if (response.data.code === 200) {
    //             s_process_num++;
    //             console.log('s_process_num', s_process_num)
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
}

// rsa私钥加密
function rsa_encrypt(data, public_key) {
    const nodersa = new NodeRSA(public_key);
    nodersa.setOptions({
        encryptionScheme: 'pkcs1'
    });
    const encrypted = nodersa.encrypt(data, 'base64');
    return encrypted;
}

function md5_32_capitalized(data) {
    return crypto.createHash('md5').update(data).digest("hex").toUpperCase();
}

if (req) {
    for (let i = 1; i <= num; i++) {
        main();
    }
}


// rsa私钥解密
function rsa_decrypt(data, private_key) {
    try {
        const nodersa = new NodeRSA(private_key);
        nodersa.setOptions({
            encryptionScheme: 'pkcs1'
        });
        const decrypted = nodersa.decrypt(data, 'utf8');
        return decrypted;
    } catch (error) {
        console.log(error)
    }
}

const dj = 'FtgB/BFdvRWvPdChIoNtsAPeAZ0VCSolVh/OVlCB4fuY7/IbyxhcUuwqv8UNRpJ1KdGUye8VqcocfiZROi8rOjcyfCWBYSgLIlED6MZRbl6m4y8Z2QUEkSVdNTatnfTqfY36TdsgVDt04aJunJOX+TficXy8HLAFOIuSGSc2gUt1do6B6sUAePEf9I8RB1vqGkyI0rrVwuhL/MyUXM5oTpIb3Y8c98OjSEyQa8LssEK2c5Y/ccViGIAXRlEshAcYC0mx8BSVLJfhsO5ZGFGH7YiMETe2M1zflv5qO0XyZZk5OVwpUR4kYYvYiQel4GIfJOLXSuz7R8IWYgYh7PNdK2b4iQ6maTeGk9iV+8at6XVqdkW4TgyoiuWoPiKMPqEPacaJVMvGhnXp/Icp4yYozMi2ZJ2UGNN7nRkVxo996mlFKq6x6DFB480gD/+B1HGccro1glEqhXPFnzUz/Em02x9YI/WTuS3Zt5+Jqxodo+4mheKbqp2K8jL4nh/lJU6gKXNbhg9k1Mp0jehxGDTj8+H1LknDJtFeME9fJBc1lao5JHPL1L/lPaQa+mPwmhkMaeE3jOE2qUe0HTR11ePBwDlR06adGPPU8nmEWKF8ZoTGt/DrSZ75eDhMsGH9yGQcABBEUy4LHZxKY4M2u0WCxuUB57kL8D0edPheFdhqDvQzb7X7MUGJFkZkHjMKJxp6ChHFSrt6sSqZRR/CW/dUwuFCJYYghhvISKMh5j3h1bjHZjbuJwQj43wImmM5FUzQcu1iqZyZNQWP09lRO53+Qriw6e+DxoUDVPxhozdVbGctraKF7CfwIf6c13N58ODCSp1yHOd8G83VhLZtieRLNklLt3LYgUjoWcNzs4wRqpcv/gXXGUQWfuPpup14w/ZsnYmiNtLyoEmO2l+ME8VDhBpZDIxi/Cy6JwpRbDX03OxlsXxILg4ltMRm5dTReADmfsaK6YMoor97whwaOoCYzfn5aAJl8+YCd8xabMrZ6HCAVCSBnC7m7aCo/te+3344JAMAHRyW1Qmd9uWZGSynZTwb2Ki0QTZDUnS2PIo/AEC6jlskds6FWavraySED9K9Ixe6eNvnV1t+yf3bCoIrtCf4uHsypdDYZgqQvH95tjnupqAhiwIBw619HnDQUW5UuTfpku9ns6bvs/pfQRE6E0iOV1Bx92DptaUnfI8xQNaN4h3GXCk3ImUmrKbZyxAg5hyggo+10OqwN1OUQbnvu8qPD7SEL/HUU2uXfaEbZs8NzcIyAx7RQArobNenOG3Tj2icnbZwETmsu4RZjGy7nFPxUxIVYkkBAYOjRvU0iq50F7SAclHUw3jhWoQE1aUf/QPKlFKt103fFkr2wKoQ9GuLAFgD2Wa4cKtP06pvECkFTh14tOYL6gQWEkjuKhDvVtNKmBeku/BwDOutxwoi6k0ZRdq5jABGtNGgnDT764ouObHjYY8F5olaChjGJ5BFMlBjssXuF2x9YKDScn9nHM/LYZbFdM5BhB/3pJm35Uo/MQqd6YbtFF8WHbNsXr/d';
// const dj_result = rsa_decrypt(dj, company_key.key)
// console.log('解密结果:', dj_result)