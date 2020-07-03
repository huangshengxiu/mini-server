var userBookModel = require('../models/usebook.js');

let getUseBook = async (req, res, next) => {
    let data = {
        'user_name': req.query.username
    };
    let result = await userBookModel.getUserBook(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 9001
            })
        } else {
            res.send({
                data: '没有书籍',
                status: 9002
            })
        }
    } else {
        res.send({
            data: '失败',
            status: 9003
        })
    }
}

let addUseBook = async (req, res, next) => {
    let userbook = {
        user_name: req.query.username,
        book_name: req.query.bookname,
        book_img: req.query.url
    };
    let result = await userBookModel.addUserBook(userbook);
    if (result) {
        res.send({
            data: result,
            status: 9011
        })
    } else {
        res.send({
            data: '失败',
            status: 9012
        })
    }
}

let deleteUseBook = async (req, res, next) => {
    let data = {
        'user_name': req.query.username,
        'book_name': req.query.bookname
    };
    let result = await userBookModel.deleteUserBook(data);
    if (result) {
        res.send({
            data: result,
            status: 9021
        })
    } else {
        res.send({
            data: '失败',
            status: 9022
        })
    }
}

let deleteAllUseBook = async (req, res, next) => {
    let data = {
        'user_name': req.query.username
    };
    let result = await userBookModel.deleteAllUserBook(data);
    if (result) {
        res.send({
            data: result,
            status: 9031
        })
    } else {
        res.send({
            data: '失败',
            status: 9032
        })
    }
}

let inUseBook = async (req, res, next) => {
    let data = {
        'user_name': req.query.username,
        'book_name': req.query.bookname
    };
    let result = await userBookModel.inUseBook(data);
    if (result) {
        res.send({
            data: result,
            status: 9041
        })
    } else {
        res.send({
            data: '失败',
            status: 9042
        })
    }
}

module.exports = {
    getUseBook,
    addUseBook,
    deleteUseBook,
    deleteAllUseBook,
    inUseBook
}