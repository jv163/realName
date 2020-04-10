/*
 * @Date: 2019-11-29 10:58:53
 * @LastEditors: JV
 * @LastEditTime: 2020-04-10 16:35:55
 * @Description: 枢纽天台风很大，但愿代码没有BUG
 */
'use strict';
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

module.exports = {
    create_rsa_key,
    rsa_encrypt,
    rsa_decrypt,
    md5_32_capitalized,
    crypto_obj
}

//创建rsa密钥对
function create_rsa_key() {
    var key = new NodeRSA({
        b: 512
    })
    key.setOptions({
        encryptionScheme: 'pkcs1'
    })
    const public_key = key.exportKey('public');
    const private_key = key.exportKey('private');
    return {
        public_key,
        private_key
    }
}

// rsa公钥加密


function rsa_encrypt(data, public_key) {
    const nodersa = new NodeRSA(public_key);
    // nodersa.setOptions({ encryptionScheme: 'pkcs1' });
    const encrypted = nodersa.encrypt(data, 'base64');
    return encrypted;
}


// rsa私钥解密
function rsa_decrypt(data, private_key) {
    const nodersa = new NodeRSA(private_key);
    const decrypted = nodersa.decrypt(data, 'utf8');
    return decrypted;
}

//md5加密(32位大写密文)
function md5_32_capitalized(data) {
    return crypto.createHash('md5').update(data).digest("hex").toUpperCase();
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