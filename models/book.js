var mongoose = require('mongoose');
var {
    bookUrl
} = require('../utils/baseMethods.js');
var url = require('url');
mongoose.set('useCreateIndex', true);
var BookSchema = mongoose.Schema({
    book_name: {
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    category: {
        type: String,
        default: "",
        require: true
    },
    book_src: {
        type: String,
        require: true,
        default: ''
    },
    book_img: {
        type: String,
        require: true,
        default: ''
    },
    author: {
        type: String,
        require: true,
        default: ''
    },
    dynasty: {
        type: String,
        require: true,
        default: ''
    },
    year: {
        type: String,
        require: true,
        default: ''
    },
    presentation: {
        type: String,
        require: true,
        default: ''
    },
});
var BookModel = mongoose.model('book', BookSchema);
BookModel.createIndexes();

var findBook = (data) => {
    let searchData = new RegExp(data);
    return BookModel.find({
        book_name: searchData
    }, {
        book_name: 1,
        book_img: 1,
        author: 1,
        dynasty: 1,
        year: 1
    });
}

var findBookUrl = (data) => {
    return BookModel.findOne({
        book_name: data
    }, {
        book_src: 1
    });
}

var getlist = (data) => {
    let reg = new RegExp(data);
    return BookModel.find({
        category: reg
    }, {
        book_name: 1,
        book_img: 1,
        author: 1,
        dynasty: 1,
        year: 1
    });
}

var getrecommend = () => {
    return BookModel.find({}, {
        book_name: 1,
        book_img: 1,
        author: 1,
        dynasty: 1,
        year: 1
    });
}

var getpre = (data) => {
    return BookModel.findOne({
        book_name: data
    }, {
        book_name: 1,
        book_img: 1,
        author: 1,
        dynasty: 1,
        year: 1,
        presentation: 1,
        category: 1
    });
}

module.exports = {
    findBook,
    findBookUrl,
    getlist,
    getpre,
    getrecommend
}