var BookModel = require('../models/book.js');
var {
    getFinalChapterList,
    groupBy,
    randomArray,
    recommend
} = require('../utils/baseMethods.js');

// 通过输入的内容查找书籍
let getSearchBook = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await BookModel.findBook(name);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 6000
            })
        } else {
            res.send({
                data: '没有找到',
                status: 6001
            })
        }
    } else {
        res.send({
            data: err,
            status: 6002
        })
    }
}

// 通过书名查找简介
let getBookInt = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await BookModel.getpre(name);
    if (result) {
        res.send({
            data: result,
            status: 6500
        })

    } else {
        res.send({
            data: err,
            status: 6502
        })
    }
}

// 通过书名查找列表简介
let getBooklist = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await BookModel.getlist(name);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 6600
            })
        } else {
            res.send({
                data: '没有找到',
                status: 6601
            })
        }
    } else {
        res.send({
            data: err,
            status: 6602
        })
    }
}

// 底部推荐书籍
let getRecommend = async (req, res, next) => {
    let result = await BookModel.getrecommend();
    if (result) {
        let len = result.length;
        if (len) {
            let array = randomArray(6, len);
            let recommentList = recommend(array, result);
            res.send({
                data: recommentList,
                status: 6700
            })
        } else {
            res.send({
                data: '没有找到',
                status: 6701
            })
        }
    } else {
        res.send({
            data: err,
            status: 6702
        })
    }
}

// 通过书名获取书籍目录
let getBookDirectory = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await BookModel.findBookUrl(name);
    if (result) {
        getFinalChapterList(result['book_src']).then(result => {
            let dir = result.directoryFormat;
            dir.shift();
            let newdata = groupBy('directory', dir);
            res.send({
                data: newdata,
                status: 6100
            });
        }).catch(err => {
            res.send({
                data: err,
                status: 6101
            });
        })
    } else {
        res.send({
            data: err,
            status: 6102
        });
    }
}

// 通过书名获取所有章节内容
let getBookChapterContent = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await BookModel.findBookUrl(name);
    if (result) {
        getFinalChapterList(result['book_src']).then(
            function (data) {
                res.send({
                    data: data.finalFormat,
                    status: 3
                });
            },
            function (err) {
                res.send({
                    data: err,
                    status: -1
                });
            }
        )
    } else {
        res.send({
            data: '没有这本书',
            status: -1
        });
    }
}

// 通过分卷名和章节名称获取章节内容
let getChapterContent = async (req, res, next) => {
    let {
        name,
        id
    } = req.query;
    let result = await BookModel.findBookUrl(name);
    if (result) {
        getFinalChapterList(result['book_src']).then(
            function (data) {
                let finaldata = data.secondFormat;
                finaldata.shift();
                res.send({
                    data: finaldata[id - 1],
                    msg: finaldata.length,
                    ne:finaldata,
                    status: 6400
                });
            },
            function (err) {
                res.send({
                    data: err,
                    status: 6401
                });
            }
        )
    } else {
        res.send({
            data: err,
            status: 6402
        });
    }
}


module.exports = {
    getSearchBook,
    getBookChapterContent,
    getBookDirectory,
    getChapterContent,
    getBookInt,
    getBooklist,
    getRecommend
}