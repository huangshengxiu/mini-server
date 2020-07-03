var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var schemaModel = {
    user_name: {
        type: String,
        require: true,
    },
    book_name: {
        type: String,
        require: true,
    },
    book_img: {
        type: String,
        require: true
    },
};

var userBookSchema = mongoose.Schema(schemaModel);
var userBookModel = mongoose.model('userBook', userBookSchema, 'user_book');
userBookModel.createIndexes();

var getUserBook = (data) => {
    return userBookModel.find(data, {
        user_name: 1,
        book_name: 1,
        book_img: 1
    });
}

var inUseBook = (data) => {
    return userBookModel.findOne(data);
}

var addUserBook = (data) => {
    let newitem = new userBookModel({
        user_name: data.user_name,
        book_name: data.book_name,
        book_img: data.book_img
    })
    return newitem.save();
}

var deleteUserBook = (data) => {
    return userBookModel.deleteOne(data);
}

var deleteAllUserBook = (data) => {
    return userBookModel.deleteMany(data);
}

module.exports = {
    getUserBook,
    addUserBook,
    deleteUserBook,
    deleteAllUserBook,
    inUseBook
}