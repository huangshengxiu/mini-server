let userModel = require('../models/user.js');
let axios = require('axios');
let jwt = require('jsonwebtoken');
let {
    wx
} = require('../utils/config')

let finduser = async (name) => {
    let result = await userModel.findOne(name);
    if (result) {
        return Promise.resolve(result);
    } else {
        return Promise.reject();
    }
}

let adduser = async (name) => {
    let result = await userModel.save(name);
    if (result) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
}

let generateToken = data => {
    return jwt.sign(data, wx.jwtSecret, {
        expiresIn: 2700
    })
}

let getOpenId = async (req, res, next) => {
    let querydata = `appid=${wx.appid}&secret=${wx.appsecret}&js_code=${req.body.code}&grant_type=client_credential`
    let wxApi = `https://api.weixin.qq.com/sns/jscode2session?${querydata}`
    axios.get(wxApi).then(response => {
        let openid = response.data.openid;
        if (response.status == 200) {
            finduser(openid).then(result => {
                console.log('有此用户')
            }).catch(err => {
                console.log('无此用户')
                adduser(openid).then(data => {
                    console.log('用户添加成功')
                }).catch(err => {
                    console.log('用户添加失败')
                })
            }).finally(() => {
                res.send({
                    token: generateToken({
                        openid: openid
                    }),
                    status: 0000
                })
            })
        }
    })
}

let checkToken = async (req, res, next) => {
    let token = req.headers.token;
    console.log(token)
    if (token) {
        // console.log('token存在');
        jwt.verify(token, wx.jwtSecret, (err, decoded) => {
            if (err) {
                console.log('err', err)
                if (err.name === 'TokenExpiredError') {
                    // console.log('过期')
                    res.send({
                        data: 'token过期啦',
                        status: 101
                    })
                } else {
                    // console.log('其他情况')
                    res.send({
                        data: 'token不合法',
                        status: 102
                    })
                }
            } else {
                // console.log(decoded);
                console.log('解码成功')
                res.send({
                    data: decoded,
                    status: 100
                })
            }
        })
    } else {
        console.log('token不存在');
        res.send({
            data: 'token不存在',
            status: 103
        })
    }
}

module.exports = {
    getOpenId,
    checkToken
}