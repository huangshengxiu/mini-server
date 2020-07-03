// 引入mongoose模块
let mongoose = require('mongoose');
// 定义一个Mongoose模块，封装一些mongoose基本信息，如数据库的URL地址
// mongodb://localhost:27017/book localhost:27017为数据库所在路径 book为要连接的数据库名
let Mongoose = {
    url: 'mongodb://localhost:27017/book',
    // 自定义封装连接方法，连接数据库的方法
    connect() {
        // 通过mongoose的connect方法连接数据库，是内置api
        // 传入三个参数，URL，配置，回调函数
        mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.log('数据库连接失败');
                return;
            }
            console.log('数据库连接成功');
        });
    }
}

let defaultData = '暂无收录数据';
let wx = {
    appid: 'xxx',
    appsecret: 'xxx',
    jwtSecret: 'xxx'
}

module.exports = {
    Mongoose, // 提供对外的接口
    defaultData,
    wx
};